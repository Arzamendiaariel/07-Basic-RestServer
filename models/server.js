const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    //Middlewares
    this.middlewares();
    //routes
    this.routes();
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
    this.app.use(this.usersPath, require('../routes/users.routes'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at port ${this.port}`);
    });
  }
}

module.exports = Server;
