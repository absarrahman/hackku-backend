const FabricCAServices = require('fabric-ca-client');
const { Wallets, X509WalletMixin } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const registerUser = async () => {
  try {
    const ccpPath = path.resolve(__dirname, '../fabric_connection', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
    const ca = new FabricCAServices(caInfo.url);
    const walletPath = path.join(__dirname, '..', 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const userExists = await wallet.get('appUser');
    if (userExists) {
      console.log('✅ User already registered');
      return;
    }

    const adminIdentity = await wallet.get('admin');
    if (!adminIdentity) throw new Error('Admin not enrolled');

    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');

    const secret = await ca.register({
      affiliation: 'org1.department1',
      enrollmentID: 'appUser',
      role: 'client',
    }, adminUser);

    const enrollment = await ca.enroll({
      enrollmentID: 'appUser',
      enrollmentSecret: secret,
    });

    const userIdentity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: 'Org1MSP',
      type: 'X.509',
    };

    await wallet.put('appUser', userIdentity);
    console.log(`✅ User enrolled and registered ${userIdentity}`);
  } catch (error) {
    console.error('❌ Failed to register user:', error);
  }
};

registerUser();
