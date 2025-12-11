import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface GroupAttributes {
  GroupID: number;
  WizardID?: number | null;
  price?: number | null;
  species?: string | null;
  size?: string | null;
  color?: string | null;
  pattern?: string | null;
  personality?: string | null;
  rarity?: string | null;
  typing?: object | null;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'GroupID'> {}

export class Group extends Model<GroupAttributes, GroupCreationAttributes>
  implements GroupAttributes {
  public GroupID!: number;
  public WizardID?: number | null;
  public price?: number | null;
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
    Group.belongsTo(models.Wizard, { foreignKey: 'WizardID' });
    Group.hasMany(models.Familiar, { foreignKey: 'GroupID' });
    Group.hasMany(models.Customer, { foreignKey: 'GroupID' });
  }
}

export function groupModel(sequelize: Sequelize): typeof Group {
  Group.init(
    {
      GroupID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      WizardID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'wizards',
          key: 'WizardID',
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
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
      tableName: 'groups',
      timestamps: false,
    }
  );

  return Group;
}
