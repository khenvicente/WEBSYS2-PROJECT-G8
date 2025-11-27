import { DataTypes, Model, Sequelize } from 'sequelize';

export interface CustomerAttributes {
  CustomerID?: number;
  GroupID?: number | null;
  name: string;
}

export class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  public CustomerID!: number;
  public GroupID!: number | null;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  Customer.init(
    {
      CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      GroupID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'GroupID'
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'customers',
      timestamps: false
    }
  );

  return Customer;
};