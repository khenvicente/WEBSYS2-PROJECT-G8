module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    ContractID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    FamiliarID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'contracts',
    timestamps: false
  });

  Contract.associate = (models) => {
    Contract.belongsTo(models.Customer, { foreignKey: 'CustomerID' });
    Contract.belongsTo(models.Familiar, { foreignKey: 'FamiliarID' });
  };

  return Contract;
};