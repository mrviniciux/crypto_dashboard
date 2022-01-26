
import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt'

'use strict';
module.exports = (sequelize, DataTypes) => {
  TimeAgo.addDefaultLocale(pt)
  const UserNotification = sequelize.define('UserNotification', {
    id_notification: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    is_read: DataTypes.BOOLEAN,
    dt_read: DataTypes.DATEONLY,
    active: DataTypes.BOOLEAN,
    time_ago: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ['createdAt']),
      get: function () {
        const timeAgo = new TimeAgo(`pt-BR`);
        return timeAgo.format(this.get('createdAt'));
     }
    }
  }, {
    tableName: 'user_notification'
  });
  UserNotification.associate = function(models) {
    UserNotification.belongsTo(models.Notification, {
      foreignKey: 'id_notification',
      as: 'notification'
    });
  };
  return UserNotification;
};