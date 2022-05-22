const { response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (term = '', res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: (user) ? [user] : [], // prettier-ignore
    });
  }
  const regex = new RegExp(term, 'i'); //making insensitive to case

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};
const searchProducts = async (term = '', res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({
      results: (product) ? [product] : [], // prettier-ignore
    });
  }

  const regex = new RegExp(term, 'i'); //making insensitive to case

  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ state: true }],
  }).populate('category', 'name');

  res.json({
    results: products,
  });
};
const searchCategory = async (term = '', res = response) => {
  const isMongoID = ObjectId.isValid(term);
  if (isMongoID) {
    const category = await Category.findById(term);
    return res.json({
      results: (category) ? [category] : [], // prettier-ignore
    });
  }

  const regex = new RegExp(term, 'i'); //making insensitive to case

  const category = await Category.find({ name: regex, state: true });

  res.json({
    results: category,
  });
};

const search = (req, res = response) => {
  const { collection, term } = req.params;
  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Allowed collections are:${allowedCollections} `,
    });
  }
  // if ('users') {
  //   searchUsers(term, res);
  // }
  switch (collection) {
    case 'users':
      searchUsers(term, res);
      break;
    case 'products':
      searchProducts(term, res);
      break;
    case 'categories':
      searchCategory(term, res);
      break;

    default:
      res.status(500).json({ msg: 'Forgot to made this search' });
      break;
  }
};

module.exports = {
  search,
};
