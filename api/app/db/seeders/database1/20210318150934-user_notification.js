'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('user_notification', [{
        id_notification: 1,
        id_user: 10,
        is_read: false,
        dt_read: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('user_notification', null, {});
  }
};
