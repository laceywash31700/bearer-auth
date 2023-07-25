'use strict';

const { usersModel } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    // console.log(`I am the body for signin up`, req.body);
    let userRecord = await usersModel.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    // console.log('im in handleSignup,', userRecord);
    res.status(201).json(output);
  } catch (e) {
    next(e);
  }
}

async function handleSignIn(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await usersModel.findAll();
    const list = userRecords.map((user) => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  handleSignup,
  handleSignIn,
  handleGetUsers,
  handleSecret,
};
