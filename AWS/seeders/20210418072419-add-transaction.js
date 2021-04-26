'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require('../transaction.json')

    data.forEach(transaction => {
      transaction.createdAt = new Date()
      transaction.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Transactions', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Transactions', null, {});
  
  }
};
