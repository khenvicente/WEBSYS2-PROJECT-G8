import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface FamiliarAttributes {
  FamiliarID: number;
  GroupID?: number | null;
  image?: string | null;
  name: string;
  species?: string | null;
  size?: string | null;
  color?: string | null;
  pattern?: string | null;
  personality?: string | null;
  rarity?: string | null;
  typing?: object | null;
}

interface FamiliarCreationAttributes extends Optional<FamiliarAttributes, 'FamiliarID' | 'GroupID' | 'image' | 'species' | 'size' | 'color' | 'pattern' | 'personality' | 'rarity' | 'typing'> {}

export class Familiar extends Model<FamiliarAttributes, FamiliarCreationAttributes>
  implements FamiliarAttributes {
  public FamiliarID!: number;
  public GroupID?: number | null;
  public image?: string | null;
  public name!: string;
  public species?: string | null;
  public size?: string | null;
  public color?: string | null;
  public pattern?: string | null;
  public personality?: string | null;
  public rarity?: string | null;
  public typing?: object | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Familiar.belongsTo(models.Group, { foreignKey: 'GroupID' });
    Familiar.hasOne(models.Contract, {
      foreignKey: 'FamiliarID',
      as: 'contract'
    });
  }
}

export function familiarModel(sequelize: Sequelize): typeof Familiar {
  Familiar.init(
    {
      FamiliarID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      GroupID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'GroupID',
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pattern: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      personality: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rarity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typing: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'familiars',
      timestamps: false,
    }
  );

  return Familiar;
}
