const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
      users: '/api/users',
    };

    // DB Connection
    this.connectDb();
    //Middlewares
    this.middlewares();
    //routes
    this.routes();
  }
  async connectDb() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    //reading and parsing of body
    this.app.use(express.json());
    //public directory
    this.app.use(express.static('public'));
    //upload files
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }
  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.products, require('../routes/products.routes'));
    this.app.use(this.paths.search, require('../routes/search.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at port ${this.port}`);
    });
  }
}

module.exports = Server;
