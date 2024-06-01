'use strict';
const jwt = require('jsonwebtoken');
const { userCollection } = require('../models/index.model.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await userCollection.create(req.body);
    res.status(201).json(userRecord);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignIn(req, res, next) {
  try {
    // Generate a token for the signed in user
    const token = jwt.sign(
      { username: req.user.username, capabilities: req.user.role },
      process.env.SECRET,
      {
        expiresIn: '1d', // Expires in 24 hours
      }
    );
    req.user.token = token;
    res.status(200).json(req.user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await usersModel.findAll({});
    const list = userRecords.map((user) => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).text('Welcome to the secret area!');
}

module.exports = {
  handleSignup,
  handleSignIn,
  handleGetUsers,
  handleSecret,
};
