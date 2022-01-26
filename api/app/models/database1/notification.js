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
  Notification.associate = function(models) {
    Notification.belongsTo(models.NotificationType, {
      foreignKey: 'id_notification_type',
      as: 'notification_type'
    });
    Notification.belongsTo(models.Payment, {
      foreignKey: 'id_payment',
      as: 'payment'
    });
    Notification.belongsTo(models.expenses, {
      foreignKey: 'id_expense',
      as: 'expense'
    });
  };
  return Notification;
};