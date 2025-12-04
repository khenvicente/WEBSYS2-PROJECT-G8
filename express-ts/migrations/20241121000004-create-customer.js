'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      CustomerID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      GroupID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'GroupID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      img: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    // Add index on foreign key
    await queryInterface.addIndex('customers', ['GroupID']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customers');
  }
};