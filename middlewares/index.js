const validateJWT = require('../middlewares/validate-jwt');
const fieldValidator = require('../middlewares/fields-validator.js');
const rolesValidators = require('../middlewares/validate-roles');
const validateUploadedFile = require('../middlewares/validate-file');

module.exports = {
  ...validateJWT,
  ...fieldValidator,
  ...rolesValidators,
  ...validateUploadedFile,
};
