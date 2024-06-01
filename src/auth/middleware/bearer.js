'use strict';

const {  usersModel } = require('../models/index.model.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  }
  try {
    const [authType, token] = req.headers.authorization.split(' ');
    if (authType === 'Bearer') {
      const validUser = await  usersModel.authenticateToken(token);
      console.log("this is the valid user", validUser);
      if (validUser) {
        req.user = validUser;
        next();
      } else {
        next('No User Found Please Sign Up');
      }
    } else {
      next('Not Authorized, no token available');
    }
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
