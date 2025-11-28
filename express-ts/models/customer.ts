import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface CustomerAttributes {
  CustomerID: number;
  GroupID: number;
  name: string;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'CustomerID'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public CustomerID!: number;
  public GroupID!: number;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  Customer.init({
    CustomerID: {
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
    }
  }, {
    sequelize,
    tableName: 'customers',
    timestamps: false
  });

  return Customer;
};

/*const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Customer = sequelize.define('Customer', {
    CustomerID: {
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
    }
  }, {
    tableName: 'customers',
    timestamps: false
  });

  return Customer;
};*/