const connectGateway = require('../fabric/gateway');

exports.createRecord = async (id, hash, metadata, owner) => {
  const { contract, gateway } = await connectGateway();
  await contract.submitTransaction('CreateRecord', id, hash, metadata, owner);
  await gateway.disconnect();
};


exports.createDummyRecords = async () => {
  const { contract, gateway } = await connectGateway();
  await contract.submitTransaction('InitLedger');
  await gateway.disconnect();
};

exports.readRecord = async (id) => {
  const { contract, gateway } = await connectGateway();
  const result = await contract.evaluateTransaction('ReadRecord', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

exports.readRecords = async () => {
  const { contract, gateway } = await connectGateway();
  const result = await contract.evaluateTransaction('GetAllAssets');
  console.log(`I am here ${result}`);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};
