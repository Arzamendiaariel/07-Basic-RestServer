const auth = require('./auth.controllers');
const categories = require('./categories.controllers');
const products = require('./products.controllers');
const search = require('./search.controllers');
const uploads = require('./uploads.controllers');
const users = require('./users.controllers');

module.exports = {
  ...auth,
  ...categories,
  ...products,
  ...search,
  ...uploads,
  ...users,
};
