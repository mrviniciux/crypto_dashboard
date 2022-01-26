'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id_notification_type: DataTypes.INTEGER,
    id_payment: DataTypes.INTEGER,
    id_expense: DataTypes.INTEGER,
    title: DataTypes.STRING,
    path: DataTypes.STRING,
    description: DataTypes.TEXT,
    active: DataTypes.BOOLEAN
  }, {
    tableName: 'notification'
  });
  Notification.associate = function(models) {};
  return Notification;
};