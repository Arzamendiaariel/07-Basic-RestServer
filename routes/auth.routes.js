const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers');
const { fieldValidator } = require('../middlewares/fields-validator.js');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'E-mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator,
  ],
  login
);
router.post(
  '/google',
  [
    check('id_token', 'Google Token is required').not().isEmpty(),

    fieldValidator,
  ],
  googleSignIn
);

module.exports = router;
