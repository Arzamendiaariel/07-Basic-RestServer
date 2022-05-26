const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator, validateJWT, isAdminRole } = require('../middlewares');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers');
const { existProduct, existCategory } = require('../helpers/db-validators');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'Invalid Mongo Id').isMongoId(),
    check('id', 'Product does not exist').custom(existProduct),
    fieldValidator,
  ],
  getProduct
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Invalid Mongo Id').isMongoId(),
    check('category', 'Category does not exist').custom(existCategory),

    fieldValidator,
  ],
  createProduct
);
router.put(
  '/:id',
  [
    validateJWT,
    check('category', 'Invalid Mongo Id').isMongoId(),
    check('id', 'Product does not exist').custom(existProduct),
    fieldValidator,
  ],
  updateProduct
);
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid Mongo Id').isMongoId(),
    check('id', 'Product does not exist').custom(existProduct),
    fieldValidator,
  ],
  deleteProduct
);

module.exports = router;
