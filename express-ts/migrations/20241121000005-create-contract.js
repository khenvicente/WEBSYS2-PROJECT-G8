'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contracts', {
      ContractID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      CustomerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes on foreign keys
    await queryInterface.addIndex('contracts', ['CustomerID']);
    await queryInterface.addIndex('contracts', ['FamiliarID']);
    
    // Add composite index for the relationship
    await queryInterface.addIndex('contracts', ['CustomerID', 'FamiliarID']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contracts');
  }
};