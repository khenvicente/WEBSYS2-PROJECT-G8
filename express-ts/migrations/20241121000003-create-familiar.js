'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('familiars', {
      FamiliarID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      GroupID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'GroupID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true
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
      },
      typing: {
        type: Sequelize.JSON,
        allowNull: true
      },
    });

    // Add index on foreign key
    await queryInterface.addIndex('familiars', ['GroupID']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('familiars');
  }
};