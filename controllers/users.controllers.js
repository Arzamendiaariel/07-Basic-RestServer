const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
// const { itsValidEmail } = require('../helpers/db-validators.js');

const User = require('../models/user.models');

const getUsers = async (req = request, res = response) => {
  //limit and skip requerire a number and querys are allways strings BE CARFUL
  const { from = 0, limit = 5 } = req.query;
  //we make a query command in order to bring only the users that are active (state:true)
  const query = { state: true };
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
    // total,
    // users,
  });
};
const postUsers = async (req = request, res = response) => {
  //checking if validators middlewares have errors

  //getting info
  const { name, email, password, role } = req.body;
  //creating instance of User
  const user = new User({ name, email, password, role });
  //crypting password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  //saving user in DB
  await user.save();

  res.json({
    user,
  });
};
const putUsers = async (req = request, res = response) => {
  const { id } = req.params; //string

  const { _id, password, google, email, ...rest } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const userDB = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    userDB,
  });
};
const patchUsers = (req = request, res = response) => {
  res.json({
    msg: 'Patch API - controlador',
  });
};
const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;

  // const uid = req.uid;
  //actualy delete it from db is not recomended because you loose db integrity if that user made things with other objects.-
  // const user = await User.findByIdAndDelete(id);
  //we only change a "flag" like state to "false" in order to indicate the inactivity of that user.-
  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(user);
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
