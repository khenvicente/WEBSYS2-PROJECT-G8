module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    CustomerID: {
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
    }
  }, {
    tableName: 'customers',
    timestamps: false
  });

  Customer.associate = (models) => {
    Customer.belongsTo(models.Group, { foreignKey: 'GroupID' });
    Customer.hasOne(models.Contract, { foreignKey: 'CustomerID' });
  };

  return Customer;
};