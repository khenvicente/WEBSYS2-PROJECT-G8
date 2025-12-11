import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('groups', {
      GroupID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      WizardID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'wizards',
          key: 'WizardID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pattern: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      personality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rarity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typing: {
        type: DataTypes.JSON,
        allowNull: true,
      }
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('groups');
  },
};
