import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface WizardAttributes {
  WizardID: number;
  name: string;
  image?: string | null;
  email: string;
  username: string;
  password: string;
  role: string;
}

interface WizardCreationAttributes extends Optional<WizardAttributes, 'WizardID' | 'image'> {}

export class Wizard extends Model<WizardAttributes, WizardCreationAttributes>
  implements WizardAttributes {
  public WizardID!: number;
  public name!: string;
  public image?: string | null;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Wizard.hasMany(models.Group, {
      foreignKey: 'WizardID',
      as: 'groups',
    });
  }
}

export function wizardModel(sequelize: Sequelize): typeof Wizard {
  Wizard.init(
    {
      WizardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      }
    },
    {
      sequelize,
      tableName: 'wizards',
      timestamps: false,
    }
  );

  return Wizard;
}
