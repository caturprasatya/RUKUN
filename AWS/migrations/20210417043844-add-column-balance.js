'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Villages',
      'balance',
     Sequelize.INTEGER
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Villages', 'balance')
  }
};
