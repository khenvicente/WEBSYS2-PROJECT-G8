import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface WizardAttributes {
  WizardID: number;
  name: string;
}

interface WizardCreationAttributes extends Optional<WizardAttributes, 'WizardID'> {}

class Wizard extends Model<WizardAttributes, WizardCreationAttributes> implements WizardAttributes {
  public WizardID!: number;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  Wizard.init({
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
    sequelize,
    tableName: 'wizards',
    timestamps: false
  });

  return Wizard;
};

/*const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

  return Wizard;
};
};*/