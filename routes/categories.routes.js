const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator, validateJWT, isAdminRole } = require('../middlewares/');
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require('../controllers/categories.controllers');
const { existCategory } = require('../helpers/db-validators');
const router = Router();
//get all categories -public
router.get('/', getCategories);
//get category for id - public
//middleware personalizado para validar el ID
router.get(
  '/:id',
  [
    check('id', 'Invalid Mongo Id').isMongoId(),
    check('id', 'Category does not exist').custom(existCategory),
    fieldValidator,
  ],
  getCategory
);
//post new category - privated any role
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidator,
  ],
  createCategory
);
//put for update category for id - privated any role
//middleware personalizado para validar el ID

router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id', 'Invalid Mongo Id').isMongoId(),
    check('id', 'Category does not exist').custom(existCategory),
    fieldValidator,
  ],
  updateCategory
);
//delete category - only admin
//middleware personalizado para validar el ID
//tmb ver que el id sea de mongo
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid Mongo Id').isMongoId(),
    fieldValidator,
  ],
  deleteCategory
);

module.exports = router;
