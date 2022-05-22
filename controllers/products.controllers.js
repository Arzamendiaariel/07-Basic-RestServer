const { response } = require('express');
const { Product } = require('../models');

const getProducts = async (req, res = response) => {
  const { from = 0, limit = 5 } = req.query;

  const query = { state: true };
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ]);
  res.json({
    total,
    products,
  });
};
const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');
  res.json(product);
};
const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;
  const name = req.body.name.toUpperCase();

  const productDB = await Product.findOne({ name });
  if (productDB) {
    return res.status(400).json({ msg: 'Product allready exists' });
  }
  const data = {
    user: req.user._id,
    ...body,
    name,
  };
  const product = new Product(data);
  await product.save();
  res.status(201).json(product);
};
const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { user, state, category, ...rest } = req.body;
  if (rest.name) {
    rest.name = rest.name.toUpperCase();
  }
  rest.user = req.user._id;
  if (rest.category) {
    rest.category = req.category._id;
  }
  const productDB = await Product.findByIdAndUpdate(id, rest, { new: true })
    .populate('user', 'name')
    .populate('category', 'name');
  res.json(productDB);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const { user, ...rest } = req.body;
  //keeping track of who changed the state of the category
  rest.user = req.user_id;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  ).populate('user', 'name');
  res.json(product);
};
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
