require('dotenv').config();

module.exports = {
  orgName: process.env.ORG_NAME,
  userId: process.env.USER_ID,
  channelName: process.env.CHANNEL_NAME,
  chaincodeName: process.env.CHAINCODE_NAME,
};

