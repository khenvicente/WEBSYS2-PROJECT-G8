import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

export interface GroupAttributes {
  GroupID: number;
  WizardID: number;
  price?: number | null;
  species_type?: string | null;
  size_range?: string | null;
  color_theme?: string | null;
  pattern_type?: string | null;
  personality_type?: string | null;
  rarity_tier?: string | null;
  primary_typing?: string | null;
  secondary_typing?: string | null;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, GroupCreationAttributes, 'GroupID'> {}

class Group extends Model<GroupAttributes> implements GroupAttributes {
  public GroupID!: number;
  public WizardID!: number;
  public price!: number | null;
  public species_type!: string | null;
  public size_range!: string | null;
  public color_theme!: string | null;
  public pattern_type!: string | null;
  public personality_type!: string | null;
  public rarity_tier!: string | null;
  public primary_typing!: string | null;
  public secondary_typing!: string | null;
}

export default (sequelize: Sequelize) => {
  Group.init(
    {
      GroupID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      WizardID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'wizards',
          key: 'WizardID'
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
      },
      species_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      size_range: {
        type: DataTypes.STRING,
        allowNull: true
      },
      color_theme: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pattern_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      personality_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      rarity_tier: {
        type: DataTypes.STRING,
        allowNull: true
      },
      primary_typing: {
        type: DataTypes.STRING,
        allowNull: true
      },
      secondary_typing: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'groups',
      timestamps: false
    }
  );

  return Group;
};
/*module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    GroupID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    WizardID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
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
    }
  }, {
    tableName: 'groups',
    timestamps: false
  });

  Group.associate = (models) => {
    Group.belongsTo(models.Wizard, { foreignKey: 'WizardID' });
    Group.hasMany(models.Familiar, { foreignKey: 'GroupID' });
    Group.hasMany(models.Customer, { foreignKey: 'GroupID' });
  };

  return Group;
};*/