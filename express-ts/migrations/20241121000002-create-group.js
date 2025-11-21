'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', {
      GroupID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      WizardID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'wizards',
          key: 'WizardID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      species: {
        type: Sequelize.STRING,
        allowNull: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pattern: {
        type: Sequelize.STRING,
        allowNull: true
      },
      personality: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rarity: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groups');
  }
};