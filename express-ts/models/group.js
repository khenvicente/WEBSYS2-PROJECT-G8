module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    GroupID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    WizardID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
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
    }
  }, {
    tableName: 'groups',
    timestamps: false
  });

  Group.associate = (models) => {
    Group.belongsTo(models.Wizard, { foreignKey: 'WizardID' });
    Group.hasMany(models.Familiar, { foreignKey: 'GroupID' });
    Group.hasMany(models.Customer, { foreignKey: 'GroupID' });
  };

  return Group;
};