'use strict';

const { usersModel } = require('../models/index.model.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await usersModel.create(req.body);
    console.log('im in signup', userRecord);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignIn(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.usersModel.token,
    };
    console.log(user);
    res.status(200).json(user);
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
