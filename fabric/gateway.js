const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { userId, channelName, chaincodeName } = require('../config/fabric-config');

const connectGateway = async () => {
  const ccpPath = path.resolve(__dirname, '../fabric_connection', 'connection-org1.json');
  const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
  const wallet = await Wallets.newFileSystemWallet(path.join(__dirname, '..', 'wallet'));
  console.log(process.env.USER_ID);
  const identity = await wallet.get(userId);

  if (!identity) throw new Error('Identity not found in wallet');

  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: userId,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork(channelName);
  const contract = network.getContract(chaincodeName);
  return { contract, gateway };
};

module.exports = connectGateway;
