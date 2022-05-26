const { Router } = require('express');
const { check } = require('express-validator');
const {
  loadFile,
  updatePicture,
  showPicture,
  updatePictureCloudinary,
} = require('../controllers');
const { allowedCollections } = require('../helpers');
const {
  validateJWT,
  validateUploadedFile,
  fieldValidator,
} = require('../middlewares');

const router = Router();

router.post('/', validateUploadedFile, loadFile);

router.put(
  '/:collection/:id',
  [
    validateUploadedFile,
    check('id', 'Invalid Mongo Id').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    fieldValidator,
  ],
  updatePictureCloudinary
);
router.get(
  '/:collection/:id',
  [
    check('id', 'Invalid Mongo Id').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    fieldValidator,
  ],
  showPicture
);

module.exports = router;
