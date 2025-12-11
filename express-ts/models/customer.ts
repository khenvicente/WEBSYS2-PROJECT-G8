import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

interface CustomerAttributes {
  CustomerID: number
  GroupID?: number | null
  name: string
  image?: string | null
  email: string
  username: string
  password: string
  role: string
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'CustomerID' | 'GroupID' | 'image'> {}

export class Customer extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes {
  public CustomerID!: number
  public GroupID?: number | null
  public name!: string
  public image?: string | null
  public email!: string
  public username!: string
  public password!: string
  public role!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public static associate(models: any) {
    Customer.belongsTo(models.Group, { foreignKey: 'GroupID' })
    Customer.hasOne(models.Contract, {
      foreignKey: 'CustomerID',
      as: 'contract'
    })
  }
}

export function customerModel(sequelize: Sequelize): typeof Customer {
  Customer.init(
    {
      CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      GroupID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'customers',
      timestamps: false,
    }
  )

  return Customer
}
