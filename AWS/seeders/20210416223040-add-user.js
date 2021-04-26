'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const data = require('../users.json')

    data.forEach(user => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null, {});
  
  }
};
