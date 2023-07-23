'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.model.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   }
  }
} : {};

const db = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const usersModel = userSchema(db, DataTypes);

module.exports = {db, usersModel};
