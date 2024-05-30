'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('user', 'writer', 'editor', 'admin'),
      defaultValue: 'user',
    },

    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, process.env.SECRET, {
        expiresIn: '1d',
        });
      },
    },
    
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['read'],
          writer: ['read', 'create'],
          editor: ['read', 'create', 'update'],
          admin: ['read', 'create', 'update', 'delete'],
        };
        return acl[this.role];
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });


  // Basic AUTH: Validating strings (username, password)
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({username: username });
    // console.log("this is the user",user);
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    } else {
      throw new Error('Invalid User');
    }
  };

  // Bearer AUTH: Validating a token
  model.authenticateToken = async function (payload) {
    try {
      const parsedToken = jwt.verify(payload, process.env.SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      } else {
        throw new Error('User Not Found');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;
