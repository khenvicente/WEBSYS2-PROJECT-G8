import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable('familiars', {
      FamiliarID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      GroupID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'GroupID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('familiars');
  },
};
