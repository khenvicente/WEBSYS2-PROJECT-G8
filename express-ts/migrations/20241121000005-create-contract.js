'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contracts', {
      ContractID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CustomerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'customers',
          key: 'CustomerID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      FamiliarID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'familiars',
          key: 'FamiliarID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contracts');
  }
};