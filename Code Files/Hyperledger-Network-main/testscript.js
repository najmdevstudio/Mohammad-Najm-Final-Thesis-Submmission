'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const { performance } = require('perf_hooks');

const CHANNEL_NAME = 'mychannel';
const CHAINCODE_NAME = 'basic';
const NUMBER_OF_ASSETS = 5; // smaller number for clarity

async function main() {
  try {
    // 1. Path to Org1 connection profile
    const ccpPath = path.resolve(
      __dirname,
      'organizations',
      'peerOrganizations',
      'org1.example.com',
      'connection-org1.json'
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // 2. Path to your wallet
    const walletPath = path.resolve(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // 3. The identity label from your wallet (e.g., 'appUser')
    const identityLabel = 'appUser';

    // 4. Connect to the gateway
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: identityLabel,
      discovery: { enabled: true, asLocalhost: true },
    });

    // 5. Access the network channel and chaincode
    const network = await gateway.getNetwork(CHANNEL_NAME);
    const contract = network.getContract(CHAINCODE_NAME);

    console.log(`\n✅ Connected to channel '${CHANNEL_NAME}' and chaincode '${CHAINCODE_NAME}'`);

    // 6. Create assets in a loop and measure performance
    console.log(`\nCreating ${NUMBER_OF_ASSETS} new, unique assets...`);
    const creationTimes = [];
    const startCreateAll = performance.now();

    // Use a timestamp to ensure unique IDs if you run multiple times
    const timestamp = Date.now();

    for (let i = 1; i <= NUMBER_OF_ASSETS; i++) {
      // Generate a unique asset ID: e.g. asset<timestamp>-<i>
      const assetKey = `asset${timestamp}-${i}`;
      const color = 'blue';
      const size = i;
      const owner = `owner${i}`;
      const appraisedValue = 100 + i;

      const startCreate = performance.now();
      await contract.submitTransaction(
        'CreateAsset',
        assetKey,
        color,
        size.toString(),
        owner,
        appraisedValue.toString()
      );
      const endCreate = performance.now();

      const timeTaken = endCreate - startCreate;
      creationTimes.push(timeTaken);
      console.log(`Asset ${assetKey} created - time: ${timeTaken.toFixed(2)} ms`);
    }

    const endCreateAll = performance.now();
    const totalCreateTime = endCreateAll - startCreateAll;

    // 7. Query all assets (including newly created ones)
    console.log(`\nQuerying all assets...`);
    const startQueryAll = performance.now();
    const resultBuffer = await contract.evaluateTransaction('GetAllAssets');
    const endQueryAll = performance.now();

    const queryAllTime = endQueryAll - startQueryAll;
    const allAssets = JSON.parse(resultBuffer.toString());

    console.log(`Total assets returned: ${allAssets.length}`);
    // Show the first few assets
    console.log(`First few assets:\n`, allAssets.slice(0, 5));

    // 8. Metrics
    const avgCreationTime =
      creationTimes.reduce((sum, t) => sum + t, 0) / creationTimes.length;

    console.log('\n=== Metrics ===');
    console.log(`• Total creation time for ${NUMBER_OF_ASSETS} assets: ${totalCreateTime.toFixed(2)} ms`);
    console.log(`• Average creation time per asset: ${avgCreationTime.toFixed(2)} ms`);
    console.log(`• Query all assets time: ${queryAllTime.toFixed(2)} ms`);

    // 9. Disconnect
    await gateway.disconnect();
    console.log('\nDisconnected from the gateway.');

  } catch (error) {
    console.error(`\n❌ Error: ${error}`);
    process.exit(1);
  }
}

main();
