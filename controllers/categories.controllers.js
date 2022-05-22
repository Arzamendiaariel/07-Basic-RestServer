const { response } = require('express');
const { isAdminRole } = require('../middlewares');
const { Category, User } = require('../models');

// getCategories - paginado - total - populate
const getCategories = async (req, res = response) => {
  // let page = Number.parseInt(req.query.page) || 1;
  // let limit = Number.parseInt(req.query.limit) || 5;
  // let from = 0;
  // let to = 0;
  // let total = 0;
  // const query = { state: true };
  // Category.countDocuments(query)
  //   .then((total) => {
  //     if (page > 1) {
  //       let totalItems = limit * page;
  //       from = totalItems - limit;
  //       to = totalItems;
  //     }
  //     Category.find(query)
  //       .skip(form)
  //       .limit(limit)
  //       .exec()
  //       .then((categories) => {
  //         res.json({
  //           data: categories,
  //           pagination: {
  //             current_page: page,
  //             last_page: page === 1 ? null : page - 1,
  //             from: from,
  //             per_page: limit,
  //             to: to,
  //             total: total,
  //           },
  //           success: true,
  //           msg: 'Data returned successfully',
  //         });
  //       });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       success: false,
  //       error,
  //     });
  //   });

  const { from = 0, limit = 5 } = req.query;
  const query = { state: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ]);
  res.json({
    total,
    categories,
  });
};
//getCategory -populate {}
const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({ msg: 'Category allready exists' });
  }

  const data = {
    name,
    user: req.user._id,
  };
  //generate new category with the data
  const category = new Category(data);
  //save in dv
  category.save();
  res.status(201).json(category);

  //generate data to save
};

//uptadeCategory, recibiendo nombre
const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...rest } = req.body;
  rest.name = rest.name.toUpperCase();
  //keeping updated last user who changed the category
  rest.user = req.user._id;
  const categoryDB = await Category.findByIdAndUpdate(id, rest, {
    new: true,
  }).populate('user', 'name');
  res.json(categoryDB);
};

//deleteCategory cambiando el estado
const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const { user, ...rest } = req.body;
  //keeping track of who changed the state of the category
  rest.user = req.user_id;
  const category = await Category.findByIdAndUpdate(
    id,
    {
      state: false,
    },
    { new: true }
  ).populate('user', 'name');
  res.json(category);
};
module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
