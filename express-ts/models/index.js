const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize("famili_dev", "root", "", {
  dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
  host: 'localhost',
  // database: 'your_database_name',
  // username: 'your_username',
  // password: 'your_password',
  logging: false // Set to console.log to see SQL queries
});

// Import models
const Wizard = require('./wizard')(sequelize);
const Group = require('./group')(sequelize);
const Customer = require('./customer')(sequelize);
const Familiar = require('./familiar')(sequelize);
const Contract = require('./contract')(sequelize);

// Define associations

// // Wizard creates Groups (one-to-many)
// Wizard.hasMany(Group, {
//   foreignKey: 'WizardID',
//   as: 'groups'
// });
// Group.belongsTo(Wizard, {
//   foreignKey: 'WizardID',
//   as: 'wizard'
// });

// // Group matches Customers (one-to-many)
// Group.hasMany(Customer, {
//   foreignKey: 'GroupID',
//   as: 'customers'
// });
// Customer.belongsTo(Group, {
//   foreignKey: 'GroupID',
//   as: 'group'
// });

// // Group contains Familiars (one-to-many)
// Group.hasMany(Familiar, {
//   foreignKey: 'GroupID',
//   as: 'familiars'
// });
// Familiar.belongsTo(Group, {
//   foreignKey: 'GroupID',
//   as: 'group'
// });

// // Customer chooses Familiar via Contract (many-to-many)
// Customer.belongsToMany(Familiar, {
//   through: Contract,
//   foreignKey: 'CustomerID',
//   otherKey: 'FamiliarID',
//   as: 'familiars'
// });
// Familiar.belongsToMany(Customer, {
//   through: Contract,
//   foreignKey: 'FamiliarID',
//   otherKey: 'CustomerID',
//   as: 'customers'
// });

// // Direct associations for Contract
// Contract.belongsTo(Customer, {
//   foreignKey: 'CustomerID',
//   as: 'customer'
// });
// Contract.belongsTo(Familiar, {
//   foreignKey: 'FamiliarID',
//   as: 'familiar'
// });

// Customer.hasMany(Contract, {
//   foreignKey: 'CustomerID',
//   as: 'contracts'
// });
// Familiar.hasMany(Contract, {
//   foreignKey: 'FamiliarID',
//   as: 'contracts'
// });

// Export models and sequelize instance
module.exports = {
  sequelize,
  Wizard,
  Group,
  Customer,
  Familiar,
  Contract
};