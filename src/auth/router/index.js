'use strict';

const express = require('express');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const {
  handleSignIn,
  handleSignup,
  handleGetUsers,
  handleSecret
} = require('./handlers.js');
const authRouter = express.Router();

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignIn);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;