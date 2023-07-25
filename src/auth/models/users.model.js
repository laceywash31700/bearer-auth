'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
  });

  model.beforeCreate(async (user) => {
    try {
      let hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    } catch (e) {
      console.error(e);
    }
  });

  // Basic AUTH: Validating strings (username, password)
  model.authenticateBasic = async function (username, password) {
    // console.log(`I am in authenticate Basic`,username,password);
    try {
      const user = await this.findOne({ where: { username } });
      // console.log(`hey i am inside of this model`, user);
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      }
      throw new Error(`user not found`);
    } catch (e) {
      throw new Error('Invalid User');
    }
  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (token) {
    console.log(`I am in the auth token method`,token);
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ username: parsedToken.username });
      if (user) {
        return user;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;
