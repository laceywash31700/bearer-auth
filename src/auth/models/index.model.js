'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');
const item = require('./item.js');
const Collection = require('./collection.js');

const DATABASE_URI= process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
// const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? { dialectOptions: {} } : {};

const db = new Sequelize(DATABASE_URI);
const usersModel = userSchema(db, DataTypes);
const itemModel = item(db, DataTypes);
const itemCollection = new Collection(itemModel);


module.exports = {db, usersModel, itemCollection};
