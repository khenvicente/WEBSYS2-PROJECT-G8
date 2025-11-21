'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('familiars', {
      FamiliarID: {
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
      personality: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rarity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pattern: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('familiars');
  }
};