'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const data = require('../village.json')

    data.forEach(village => {
      village.createdAt = new Date()
      village.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Villages', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Villages', null, {});
  
  }
};
