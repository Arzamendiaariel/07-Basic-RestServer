const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

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
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/users.routes'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at port ${this.port}`);
    });
  }
}

module.exports = Server;
