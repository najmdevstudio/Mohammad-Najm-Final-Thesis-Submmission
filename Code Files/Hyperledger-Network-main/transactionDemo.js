'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const fs = require('fs');
const { performance } = require('perf_hooks');

// ------------------------------------------------------------------------
// Adjust these to match your setup
// ------------------------------------------------------------------------
const CHANNEL_NAME = 'mychannel';
const CHAINCODE_NAME = 'basic';

// We’ll create 5 users, each with 3 assets, totaling 15 assets.
const USERS = ['User1', 'User2', 'User3', 'User4', 'User5'];
const ASSETS_PER_USER = 3;

// Path to your Org1 connection profile
// e.g., test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json
const ccpPath = path.resolve(
  __dirname,
  'organizations',
  'peerOrganizations',
  'org1.example.com',
  'connection-org1.json'
);

// Path to your wallet folder
const walletPath = path.resolve(__dirname, 'wallet');

// Fabric CA name from your connection profile
// e.g., "ca.org1.example.com" if using the default test-network
const CA_NAME = 'ca.org1.example.com';

// Admin identity (pre-enrolled) that we’ll use to register new users
const ADMIN_IDENTITY = 'admin';
const ADMIN_SECRET = 'adminpw'; // default secret in test-network with -ca option

// MSP ID for Org1 (defaults to Org1MSP)
const MSP_ID = 'Org1MSP';

// ------------------------------------------------------------------------
// Helper: registerUser
// ------------------------------------------------------------------------
/**
 * Register and enroll a new user with the Fabric CA, storing credentials in wallet.
 * @param {String} userId - The user ID (e.g. 'User1').
 */
async function registerUser(userId) {
  // 1. Load the connection profile
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

  // 2. Create a new CA client
  const caURL = ccp.certificateAuthorities[CA_NAME].url;
  const ca = new FabricCAServices(caURL);

  // 3. Create wallet, check if user already exists
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const userIdentity = await wallet.get(userId);
  if (userIdentity) {
    console.log(`User "${userId}" is already registered in the wallet.`);
    return;
  }

  // 4. Check if the admin is enrolled
  const adminIdentity = await wallet.get(ADMIN_IDENTITY);
  if (!adminIdentity) {
    throw new Error(
      `Admin identity "${ADMIN_IDENTITY}" not found in wallet. Enroll admin first.`
    );
  }

  // 5. Build a user object for authenticating with the CA
  const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
  const adminUser = await provider.getUserContext(adminIdentity, ADMIN_IDENTITY);

  // 6. Register the user with the CA
  const secret = await ca.register(
    {
      enrollmentID: userId,
      enrollmentSecret: `${userId}pw`,
      role: 'client',
      affiliation: 'org1.department1',
    },
    adminUser
  );

  // 7. Enroll the user
  const enrollment = await ca.enroll({
    enrollmentID: userId,
    enrollmentSecret: secret,
  });

  // 8. Import the new identity into the wallet
  const x509Identity = {
    credentials: {
      certificate: enrollment.certificate,
      privateKey: enrollment.key.toBytes(),
    },
    mspId: MSP_ID,
    type: 'X.509',
  };

  await wallet.put(userId, x509Identity);
  console.log(`Successfully registered and enrolled user "${userId}"`);
}

// ------------------------------------------------------------------------
// Main Script
// ------------------------------------------------------------------------
async function main() {
  // Arrays to capture metric times (in ms)
  const userCreationTimes = [];
  const assetCreationTimes = [];
  const transferTimes = [];
  const queryTimes = []; // We'll store the per-user query times here

  try {
    // 1. Register + Enroll Each User
    for (const user of USERS) {
      const start = performance.now();
      await registerUser(user);
      const end = performance.now();
      userCreationTimes.push(end - start);
    }

    // 2. Create assets for each user
    //    We'll store each user’s asset IDs so we can do transfers later
    const userAssets = {}; // e.g. { 'User1': ['asset123', 'asset124', ...], ... }

    // For uniqueness, add a timestamp
    const timestamp = Date.now();

    // Loop each user, connect as them, create 3 assets
    for (const user of USERS) {
      // Connect as user
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
      const wallet = await Wallets.newFileSystemWallet(walletPath);

      // Gateway for the user
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: user,
        discovery: { enabled: true, asLocalhost: true },
      });

      // Get contract
      const network = await gateway.getNetwork(CHANNEL_NAME);
      const contract = network.getContract(CHAINCODE_NAME);

      // Create 3 assets for this user
      userAssets[user] = [];
      for (let i = 1; i <= ASSETS_PER_USER; i++) {
        // Unique ID
        const assetId = `asset-${user}-${timestamp}-${i}`;
        const color = 'blue';
        const size = (10 + i).toString();
        const owner = user;
        const appraisedValue = (100 + i).toString();

        const startCreate = performance.now();
        await contract.submitTransaction(
          'CreateAsset',
          assetId,
          color,
          size,
          owner,
          appraisedValue
        );
        const endCreate = performance.now();

        assetCreationTimes.push(endCreate - startCreate);
        console.log(`Created asset "${assetId}" for user "${user}"`);
        userAssets[user].push(assetId);
      }

      await gateway.disconnect();
    }

    // 3. Transfer each user’s assets to the next user in a cycle
    //    So user1 -> user2, user2 -> user3, user3 -> user4, user4 -> user5, user5 -> user1
    //    In the end, each user still owns 3 assets, but from the previous user in the list.
    console.log('\nTransferring assets in a cycle...');
    for (let i = 0; i < USERS.length; i++) {
      const fromUser = USERS[i];
      // Next user index (wrap around with modulo)
      const toUser = USERS[(i + 1) % USERS.length];

      // Connect as fromUser
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: fromUser,
        discovery: { enabled: true, asLocalhost: true },
      });

      const network = await gateway.getNetwork(CHANNEL_NAME);
      const contract = network.getContract(CHAINCODE_NAME);

      // Transfer each asset that belongs to fromUser over to toUser
      for (const assetId of userAssets[fromUser]) {
        const startTransfer = performance.now();
        await contract.submitTransaction('TransferAsset', assetId, toUser);
        const endTransfer = performance.now();

        transferTimes.push(endTransfer - startTransfer);
        console.log(
          `Transferred asset "${assetId}" from "${fromUser}" to "${toUser}"`
        );
      }

      await gateway.disconnect();
    }

    // --------------------------------------------------------------------
    // NEW SECTION: Query assets per user (post-transfer)
    // --------------------------------------------------------------------
    console.log('\nQuerying which assets each user now owns...');

    for (const user of USERS) {
      // Connect as user
      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      const gateway = new Gateway();

      await gateway.connect(ccp, {
        wallet,
        identity: user,
        discovery: { enabled: true, asLocalhost: true },
      });

      const network = await gateway.getNetwork(CHANNEL_NAME);
      const contract = network.getContract(CHAINCODE_NAME);

      // Measure the query time
      const startQuery = performance.now();
      const allAssetsBuffer = await contract.evaluateTransaction('GetAllAssets');
      const endQuery = performance.now();

      // Record the time
      queryTimes.push(endQuery - startQuery);

      // Filter the assets to find which ones are owned by the current user
      const allAssets = JSON.parse(allAssetsBuffer.toString());
      const ownedByUser = allAssets.filter(a => a.Owner === user);

      console.log(
        `User "${user}" owns [${ownedByUser.map(a => a.ID).join(', ')}]`
      );

      await gateway.disconnect();
    }

    // --------------------------------------------------------------------
    // Metrics
    // --------------------------------------------------------------------
    const avgUserCreation =
      userCreationTimes.reduce((a, b) => a + b, 0) / userCreationTimes.length;
    const avgAssetCreation =
      assetCreationTimes.reduce((a, b) => a + b, 0) / assetCreationTimes.length;
    const avgTransferTime =
      transferTimes.reduce((a, b) => a + b, 0) / transferTimes.length;
    const avgQueryTime =
      queryTimes.reduce((a, b) => a + b, 0) / queryTimes.length;

    const totalUsers = USERS.length;
    const totalAssets = totalUsers * ASSETS_PER_USER;
    const totalQueries = queryTimes.length;

    console.log('\n=== Metrics ===');
    console.log(`Number of users registered: ${totalUsers}`);
    console.log(
      `• Total user registration time: ${(
        userCreationTimes.reduce((a, b) => a + b, 0) / 1000
      ).toFixed(3)} s`
    );
    console.log(
      `• Average user registration time: ${(avgUserCreation / 1000).toFixed(
        3
      )} s`
    );

    console.log(`\nNumber of assets created: ${totalAssets}`);
    console.log(
      `• Total asset creation time: ${(
        assetCreationTimes.reduce((a, b) => a + b, 0) / 1000
      ).toFixed(3)} s`
    );
    console.log(
      `• Average asset creation time: ${avgAssetCreation.toFixed(2)} ms`
    );

    console.log(`\nNumber of transfers: ${totalAssets}`);
    console.log(
      `• Total transfer time: ${(
        transferTimes.reduce((a, b) => a + b, 0) / 1000
      ).toFixed(3)} s`
    );
    console.log(`• Average transfer time: ${avgTransferTime.toFixed(2)} ms`);

    console.log(`\nNumber of queries: ${totalQueries}`);
    console.log(
      `• Total query time: ${(queryTimes.reduce((a, b) => a + b, 0) / 1000).toFixed(
        3
      )} s`
    );
    console.log(`• Average query time: ${avgQueryTime.toFixed(2)} ms`);

    console.log('\nScript completed successfully!');
  } catch (error) {
    console.error(`\n❌ Error: ${error}`);
    process.exit(1);
  }
}

main();
