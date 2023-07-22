'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../__test__/src/auth/auth/middleware/basic.js');
const bearerAuth = require('../__test__/src/auth/auth/middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;
