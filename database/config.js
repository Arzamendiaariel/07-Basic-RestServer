const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const url = process.env.MONGODB_CNN;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });
    console.log('Database is connected');
  } catch (error) {
    console.log(error);
    throw new Error('error in DB connection');
  }
};

module.exports = {
  dbConnection,
};
