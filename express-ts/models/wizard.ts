import { DataTypes, Model, Sequelize } from 'sequelize';

export interface WizardAttributes {
  WizardID?: number;
  name: string;
}

export class Wizard extends Model<WizardAttributes> implements WizardAttributes {
  public WizardID!: number;
  public name!: string;

  public static associate(models: any) {
    Wizard.hasMany(models.FamiliarGroup, { foreignKey: 'WizardID' });
  }
}

export default (sequelize: Sequelize) => {
  Wizard.init(
    {
      WizardID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'wizards',
      timestamps: false
    }
  );

  return Wizard;
};

/*module.exports = (sequelize, DataTypes) => {
  const Wizard = sequelize.define('Wizard', {
    WizardID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'wizards',
    timestamps: false
  });

  Wizard.associate = (models) => {
    Wizard.hasMany(models.Group, { foreignKey: 'WizardID' });
  };

  return Wizard;
};*/