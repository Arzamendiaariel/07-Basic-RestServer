const { Router } = require('express');
const { check } = require('express-validator');
const {
  validateJWT,
  fieldValidator,
  isAdminRole,
  hasRole,
} = require('../middlewares');

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/users.controllers.js');
const {
  itsValidRole,
  itsValidEmail,
  existMongoId,
} = require('../helpers/db-validators.js');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and need to have more than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'E-mail is not valid').isEmail(),
    check('email').custom(itsValidEmail),
    // check('role', 'Is not an admited Rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(itsValidRole),
    fieldValidator,
  ],
  postUsers
);

router.put(
  '/:id',
  [
    check('id', `The id isn't valid`).isMongoId(),
    check('id').custom(existMongoId),
    check('role').custom(itsValidRole),
    fieldValidator,
  ],
  putUsers
);

router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', `The id isn't valid`).isMongoId(),
    check('id').custom(existMongoId),
    fieldValidator,
  ],
  deleteUsers
);

module.exports = router;
