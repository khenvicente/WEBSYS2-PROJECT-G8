import { Sequelize, DataTypes, Model, Optional } from 'sequelize';


interface FamiliarAttributes {
  FamiliarID: number;
  GroupID: number;
  name: string;
  species?: string | null;
  size?: string | null;
  color?: string | null;
  pattern?: string | null;
  personality?: string | null;
  rarity?: string | null;
  typing?: string | null;
  typing2?: string | null;
}


interface FamiliarCreationAttributes extends Optional<FamiliarAttributes, 'FamiliarID'> {}


class Familiar extends Model<FamiliarAttributes, FamiliarCreationAttributes> implements FamiliarAttributes {
  public FamiliarID!: number;
  public GroupID!: number;
  public name!: string;
  public species!: string | null;
  public size!: string | null;
  public color!: string | null;
  public pattern!: string | null;
  public personality!: string | null;
  public rarity!: string | null;
  public typing!: string | null;
  public typing2!: string | null;
}

export default (sequelize: Sequelize) => {
  Familiar.init({
    FamiliarID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'GroupID'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'familiars',
    timestamps: false
  });

  return Familiar;
};

/*const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Familiar = sequelize.define('Familiar', {
    FamiliarID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    GroupID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'GroupID'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pattern: {
      type: DataTypes.STRING,
      allowNull: true
    },
    personality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing: {
      type: DataTypes.STRING,
      allowNull: true
    },
    typing2: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'familiars',
    timestamps: false
  });

  return Familiar;
};
};*/