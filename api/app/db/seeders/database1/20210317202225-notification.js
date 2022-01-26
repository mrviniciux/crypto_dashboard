'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('notification', [{
        title: 'Pagamento à vencer hoje', 
        path: '/pagamentos/1', 
        description: 'Pagamento vence hoje',
        id_notification_type: 1,
        id_payment: 1,
        id_expense: null,
        updatedAt: new Date(),
        createdAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notification', null, {});
  }
};
