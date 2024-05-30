'use strict';

const item = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Item;
};

module.exports = item;