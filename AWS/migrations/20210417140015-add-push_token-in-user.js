'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Users',
      'push_token',
     Sequelize.STRING
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users','push_token'); 
  }
};
