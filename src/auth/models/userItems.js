'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserItems = sequelize.define('UserItems', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Items', 
        key: 'id',
      },
      allowNull: false,
    },
  });

  return UserItems;
};
