const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  allowedExtentions = ['png', 'jpg', 'jpeg', 'gif'],
  directory = ''
) => {
  return new Promise((resolve, reject) => {
    // The name of the input field (i.e. "file") is used to retrieve the uploaded file
    const { file } = files;
    const cutedName = file.name.split('.');
    const extention = cutedName[cutedName.length - 1];
    //validate extention

    if (!allowedExtentions.includes(extention)) {
      return reject(
        `The ${extention} is not allowed, try: ${allowedExtentions} extentions`
      );
    }

    const tempName = uuidv4() + '.' + extention;
    const uploadPath = path.join(__dirname, '../uploads/', directory, tempName);

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, function (err) {
      if (err) return reject(err);

      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
};
