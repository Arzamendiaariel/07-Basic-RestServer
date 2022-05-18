const bcryptjs = require('bcryptjs');
const { response, json } = require('express');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //check if email exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'User/Password is not correct - email',
      });
    }
    //check if user is active
    if (!user.state) {
      return res.status(400).json({
        msg: 'User/Password is not correct - state= false',
      });
    }
    //check password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User/Password is not correct -invalid password',
      });
    }
    //generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Something went wrong talk to the admin',
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        picture,
        email,
        password: ':P',
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    //if user in db exist but state is false (deleted)
    if (!user.state) {
      return res.status(401).json({
        msg: 'Contact adminsitrator, user Blocked',
      });
    }

    //generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Invalid Google Token',
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
