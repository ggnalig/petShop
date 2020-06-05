'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Transcactions','price',{ type: Sequelize.INTEGER });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Transcactions','price',{});
  }
};
