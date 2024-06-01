'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');
const itemSchema = require('./item.js');
const userItemsSchema = require('./userItems.js');
const Collection = require('./collection.js');

const DATABASE_URI = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? { dialectOptions: {} } : {};

const db = new Sequelize(DATABASE_URI, DATABASE_CONFIG);

const User = userSchema(db, DataTypes);
const Item = itemSchema(db, DataTypes);
const UserItems = userItemsSchema(db, DataTypes);

User.belongsToMany(Item, { through: UserItems });
Item.belongsToMany(User, { through: UserItems });

const userCollection = new Collection(User);
const itemCollection = new Collection(Item);

module.exports = { db, userCollection, itemCollection, User };
