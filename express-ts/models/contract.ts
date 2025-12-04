import { DataTypes, Model, Sequelize } from 'sequelize';

export interface ContractAttributes {
  ContractID?: number;
  CustomerID: number;
  FamiliarID: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Contract extends Model<ContractAttributes> implements ContractAttributes {
  public ContractID!: number;
  public CustomerID!: number;
  public FamiliarID!: number;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
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
      }
    },
    {
      sequelize,
      tableName: 'contracts',
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Contract;
};
