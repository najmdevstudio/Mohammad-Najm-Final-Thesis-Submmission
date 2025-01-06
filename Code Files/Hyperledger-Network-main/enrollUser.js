'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

async function main() {
  try {
    // 1. Load connection profile for Org1
    const ccpPath = path.resolve(
      __dirname,
      'organizations',
      'peerOrganizations',
      'org1.example.com',
      'connection-org1.json'
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // 2. Create CA client
    const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
    const ca = new FabricCAServices(caURL);

    // 3. Create a new file system based wallet
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // 4. Check if user already exists
    const userIdentity = await wallet.get('appUser');
    if (userIdentity) {
      console.log('An identity for the user "appUser" already exists in the wallet');
      return;
    }

    // 5. Check if admin is enrolled
    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) {
      console.log('Admin identity not found in the wallet. Enroll admin first.');
      return;
    }

    // 6. Get admin user context
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');

    // 7. Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({
      enrollmentID: 'appUser',
      enrollmentSecret: 'appUserpw',
      role: 'client',
      // any other attributes or affiliation can be added here
      affiliation: 'org1.department1'
    }, adminUser);

    const enrollment = await ca.enroll({
      enrollmentID: 'appUser',
      enrollmentSecret: secret,
    });

    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: 'Org1MSP',
      type: 'X.509',
    };

    await wallet.put('appUser', x509Identity);
    console.log('Successfully registered and enrolled user "appUser" and imported it into the wallet');

  } catch (error) {
    console.error(`Failed to register user "appUser": ${error}`);
    process.exit(1);
  }
}

main();
