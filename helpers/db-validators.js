const Role = require('../models/role');
const User = require('../models/user');

const itsValidRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`${role} isn't registered in the database`);
  }
};

const itsValidEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`${email} is already been used by another user`);
  }
};
const existMongoId = async (id) => {
  const existId = await User.findById(id);
  if (!existId) {
    throw new Error(`${id} doesn't exist`);
  }
};

module.exports = {
  itsValidRole,
  itsValidEmail,
  existMongoId,
};
