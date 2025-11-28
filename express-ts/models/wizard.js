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
    }
  }, {
    tableName: 'wizards',
    timestamps: false
  });

  return Wizard;
};