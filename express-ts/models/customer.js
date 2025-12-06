const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Customer = sequelize.define('Customer', {
    CustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //   model: 'groups',
      //   key: 'GroupID'
      // }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'customers',
    timestamps: false
  }
);

// NEW
Customer.associate = (models) => {
  Customer.belongsTo(models.Group, {
    foreignKey: "GroupID"
  })
  Customer.hasOne(models.Contract, {
    foreignKey: "CustomerID"
  })
}

  return Customer;
};