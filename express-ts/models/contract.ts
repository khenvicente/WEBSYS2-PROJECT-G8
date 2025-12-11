import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ContractAttributes {
  ContractID: number;
  CustomerID: number;
  FamiliarID: number;
  status?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

interface ContractCreationAttributes extends Optional<ContractAttributes, 'ContractID' | 'status' | 'created_at' | 'updated_at'> {}

export class Contract extends Model<ContractAttributes, ContractCreationAttributes>
  implements ContractAttributes {
  public ContractID!: number;
  public CustomerID!: number;
  public FamiliarID!: number;
  public status?: string | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate(models: any) {
    Contract.belongsTo(models.Customer, { 
      foreignKey: 'CustomerID',
      as: 'customer'
    });
    Contract.belongsTo(models.Familiar, { 
      foreignKey: 'FamiliarID',
      as: 'familiar'
    });
  }
}

export function contractModel(sequelize: Sequelize): typeof Contract {
  Contract.init(
    {
      ContractID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FamiliarID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'contracts',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Contract;
}
