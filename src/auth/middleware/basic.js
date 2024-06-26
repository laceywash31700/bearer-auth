'use strict';

const base64 = require('base-64');
const { User } = require('../models/index.model.js');


module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return next(); }

  let basic = req.headers.authorization.split(' ');
  let encodedPassWord = [...basic].pop();
  let decodedString = base64.decode(encodedPassWord);
  let [username, password] = decodedString.split(':');

  try {
    req.user = await User.authenticateBasic(username,password); 
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

