const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { User, Product } = require('../models');
const { response } = require('express');
const { uploadFile } = require('../helpers');
const { REPL_MODE_SLOPPY } = require('repl');

const loadFile = async (req, res = response) => {
  try {
    // const fileName = await uploadFile(req.files, ['txt', 'md'], 'texts');
    const fileName = await uploadFile(req.files, undefined, 'imgs');

    res.json({
      fileName,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updatePicture = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({ msg: 'User Id not found in Data Base' });
      }

      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: 'Product Id not found in Data Base' });
      }
      break;
    default:
      return res.status(500).json({ msg: 'frogot to validate this' });
  }

  //clean previous pictures

  //first we seek if the picture exists
  if (model.picture) {
    const picturePath = path.join(
      __dirname + '../../uploads',
      collection,
      model.picture
    );

    console.log(picturePath);
    console.log(fs.existsSync(picturePath));
    //if it exists we delete it

    if (fs.existsSync(picturePath)) {
      fs.unlinkSync(picturePath);
    }
  }
  const fileName = await uploadFile(req.files, undefined, collection);
  model.picture = fileName;
  await model.save();

  res.json(model);
};

const showPicture = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({ msg: 'User Id not found in Data Base' });
      }

      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: 'Product Id not found in Data Base' });
      }
      break;
    default:
      return res.status(500).json({ msg: 'frogot to validate this' });
  }

  //clean previous pictures

  //first we seek if the picture exists
  if (model.picture) {
    const picturePath = path.join(
      __dirname + '../../uploads',
      collection,
      model.picture
    );

    console.log(picturePath);
    console.log(fs.existsSync(picturePath));
    //if it exists we delete it

    if (fs.existsSync(picturePath)) {
      return res.sendFile(picturePath);
    }
  }
  const defaultPicture = path.join(__dirname + '../../assets/noImage.jpg');

  res.sendFile(defaultPicture);
};

const updatePictureCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);

      if (!model) {
        return res.status(400).json({ msg: 'User Id not found in Data Base' });
      }

      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ msg: 'Product Id not found in Data Base' });
      }
      break;
    default:
      return res.status(500).json({ msg: 'frogot to validate this' });
  }

  //clean previous pictures

  //first we seek if the picture exists
  if (model.picture) {
    //we work with the secure_url untill we get the public_id
    const nameArr = model.picture.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    //we delete from claudinary de duplicated value so we keep only the lastone
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.file;

  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.picture = secure_url;
    await model.save();
    res.json(model);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
module.exports = {
  loadFile,
  updatePicture,
  showPicture,
  updatePictureCloudinary,
};
