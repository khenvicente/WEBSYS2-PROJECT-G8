module.exports = (sequelize, DataTypes) => {
  const Familiar = sequelize.define('Familiar', {
    FamiliarID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    personality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'familiars',
    timestamps: false
  });

  Familiar.associate = (models) => {
    Familiar.belongsTo(models.Group, { foreignKey: 'GroupID' });
    Familiar.hasOne(models.Contract, { foreignKey: 'FamiliarID' });
  };

  return Familiar;
};