const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
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
  }
  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.categories, require('../routes/categories.routes'));
    this.app.use(this.paths.products, require('../routes/products.routes'));
    this.app.use(this.paths.users, require('../routes/users.routes'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at port ${this.port}`);
    });
  }
}

module.exports = Server;
