const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Familiar = sequelize.define('Familiar', {
    FamiliarID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'GroupID'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'familiars',
    timestamps: false
  });

  return Familiar;
};