import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Attributes
interface ContractAttributes {
  ContractID: number;
  CustomerID: number;
  FamiliarID: number;
  status?: string | null;
  created_at: Date;
  updated_at: Date;
}

interface ContractCreationAttributes extends Optional<ContractAttributes, 'ContractID' | 'created_at' | 'updated_at'> {}

class Contract extends Model<ContractAttributes, ContractCreationAttributes> implements ContractAttributes {
  public ContractID!: number;
  public CustomerID!: number;
  public FamiliarID!: number;
  public status!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Contract.init(
    {
      ContractID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      FamiliarID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'contracts',
      timestamps: true,
      underscored: true
    }
  );

  return Contract;
};