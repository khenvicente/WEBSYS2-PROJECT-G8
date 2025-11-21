'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wizards', {
      WizardID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wizards');
  }
};