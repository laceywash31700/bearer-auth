'use strict';

require('dotenv').config();
const {db} = require('./src/auth/models/index.js');
const { startup } = require('./src/server');
const Port = process.env.PORT || 3002;

// Start up DB Server
db.sync()
  .then(() => {
    // Start the web servercd c 
    startup(Port);
  })
  .catch(error => console.error(error));
