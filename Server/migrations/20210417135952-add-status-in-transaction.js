'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Transactions',
      'status',
     Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Transactions','status'); 
  }
};
