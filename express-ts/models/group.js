const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Group = sequelize.define('Group', {
    GroupID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    WizardID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'wizards',
        key: 'WizardID'
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    species_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size_range: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color_theme: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pattern_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personality_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rarity_tier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing: {
      type: DataTypes.JSON,
      allowNull: true
    }
  },
  {
    tableName: 'groups',
    timestamps: false
  }
);

// NEW
Group.associate = (models) => {
  Group.belongsTo(models.Wizard, {
    foreignKey: "WizardID"
  })
  Group.hasMany(models.Familiar, {
    foreignKey: "GroupID"
  })
  Group.hasMany(models.Customer, {
    foreignKey: "GroupID"
  })
}

  return Group;
};