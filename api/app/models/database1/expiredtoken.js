'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExpiredToken = sequelize.define('ExpiredToken', {
    token: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  ExpiredToken.associate = function(models) {
    // associations can be defined here
  };
  return ExpiredToken;
};