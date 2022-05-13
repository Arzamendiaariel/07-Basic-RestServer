const { Router } = require('express');
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/users.controllers.js');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', putUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;
