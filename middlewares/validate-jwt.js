const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: "There's no validate token" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //read uid
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: 'Invalid Token - invalid user ',
      });
    }
    //check if uid is true
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid Token - user state is false ',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Invalid Token' });
  }
};

module.exports = {
  validateJWT,
};
