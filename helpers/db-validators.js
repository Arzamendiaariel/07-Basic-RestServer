const { Role, User, Category, Product } = require('../models');

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

const existCategory = async (id) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`${id} doesn't exist`);
  }
};
const existProduct = async (id) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`${id} doesn't exist`);
  }
};
const allowedCollections = (collection = '', collections = []) => {
  const incluided = collections.includes(collection);
  if (!incluided) {
    throw new Error(`${collection} is not allowed, try: ${collections}`);
  }
  return true;
};

module.exports = {
  itsValidRole,
  itsValidEmail,
  existMongoId,
  existCategory,
  existProduct,
  allowedCollections,
};
