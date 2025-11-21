module.exports = (sequelize, DataTypes) => {
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

  Wizard.associate = (models) => {
    Wizard.hasMany(models.Group, { foreignKey: 'WizardID' });
  };

  return Wizard;
};