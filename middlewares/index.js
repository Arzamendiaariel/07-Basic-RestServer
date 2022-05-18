const validateJWT = require('../middlewares/validate-jwt');
const fieldValidator = require('../middlewares/fields-validator.js');
const rolesValidators = require('../middlewares/validate-roles');

module.exports = {
  ...validateJWT,
  ...fieldValidator,
  ...rolesValidators,
};
