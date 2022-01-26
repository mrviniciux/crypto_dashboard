'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('notification_type', [
        {
          name: 'Á vencer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Vencido',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Clube expirando',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notification_type', null, {});
  }
};
