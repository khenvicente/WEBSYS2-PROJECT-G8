const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Wizard = sequelize.define('Wizard', {
    WizardID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNullL: true
    }
  },
  {
    tableName: 'wizards',
    timestamps: false
  }
);

// NEW
Wizard.associate = (models) => {
  Wizard.hasMany(models.Group, {
    foreignKey: "Wizard"
  })
}

  return Wizard;
};