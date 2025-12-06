const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contract = sequelize.define('Contract', {
    ContractID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'customers',
      //   key: 'CustomerID'
      // }
    },
    FamiliarID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'familiars',
      //   key: 'FamiliarID'
      // }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW
    // }
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
    tableName: 'contracts',
    timestamps: true,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at'
  }
);

// NEW 
Contract.associate = (models) => {
  Contract.belongsTo(models.Customer, {
    foreignKey: "CustomerID"
  })
  Contract.belongsto(models.Familiar, {
    foreignKey: "FamiliarID"
  })
}

  return Contract;
};