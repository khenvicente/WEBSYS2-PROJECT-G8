'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', {
      GroupID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      species_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      size_range: {
        type: Sequelize.STRING,
        allowNull: true
      },
      color_theme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pattern_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      personality_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rarity_tier: {
        type: Sequelize.STRING,
        allowNull: true
      },
      typing: {
        type: Sequelize.JSON,
        allowNull: true
      },
    });

    // Add index on foreign key
    await queryInterface.addIndex('groups', ['WizardID']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groups');
  }
};