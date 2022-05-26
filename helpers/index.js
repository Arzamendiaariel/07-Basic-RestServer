const dbValidatos = require('./db-validators');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFIle = require('./upload-file');

module.exports = {
  ...dbValidatos,
  ...generateJWT,
  ...googleVerify,
  ...uploadFIle,
};
