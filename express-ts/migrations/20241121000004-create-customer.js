'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      CustomerID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      GroupID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'GroupID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers');
  }
};