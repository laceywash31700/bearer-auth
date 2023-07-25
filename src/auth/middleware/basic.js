'use strict';

const base64 = require('base-64');
const { usersModel } = require('../../../src/auth/models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { return next(); }
  let basic = req.headers.authorization.split(' ');
  let basicPass = basic.pop();
  let decodedPass= base64.decode(basicPass);
  let [username, pass] = decodedPass.split(':');
  
  try {
    req.user = await usersModel.authenticateBasic(username, pass);
    next();
  }
  catch (e) {
    res.status(403).send('Invalid Login');
  }

};

