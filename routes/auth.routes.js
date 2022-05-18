const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
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

module.exports = router;
