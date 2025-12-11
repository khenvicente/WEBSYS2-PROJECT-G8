import { Sequelize } from 'sequelize';
import { wizardModel, Wizard } from './wizard';
import { groupModel, Group } from './group';
import { customerModel, Customer } from './customer';
import { familiarModel, Familiar } from './familiar';
import { contractModel, Contract } from './contract';

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'famili_dev',
  process.env.DB_USER || 'websys2',
  process.env.DB_PASS || 'websys2',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
  }
);

wizardModel(sequelize);
groupModel(sequelize);
customerModel(sequelize);
familiarModel(sequelize);
contractModel(sequelize);

Wizard.hasMany(Group, {
  foreignKey: 'WizardID',
  as: 'groups',
});
Group.belongsTo(Wizard, {
  foreignKey: 'WizardID',
  as: 'wizard',
});

Group.hasMany(Customer, {
  foreignKey: 'GroupID',
  as: 'customers',
});
Customer.belongsTo(Group, {
  foreignKey: 'GroupID',
  as: 'group',
});

Group.hasMany(Familiar, {
  foreignKey: 'GroupID',
  as: 'familiars',
});
Familiar.belongsTo(Group, {
  foreignKey: 'GroupID',
  as: 'group',
});

Customer.belongsToMany(Familiar, {
  through: Contract,
  foreignKey: 'CustomerID',
  otherKey: 'FamiliarID',
  as: 'familiars',
});
Familiar.belongsToMany(Customer, {
  through: Contract,
  foreignKey: 'FamiliarID',
  otherKey: 'CustomerID',
  as: 'customers',
});

Contract.belongsTo(Customer, {
  foreignKey: 'CustomerID',
  as: 'customer',
});
Contract.belongsTo(Familiar, {
  foreignKey: 'FamiliarID',
  as: 'familiar',
});

Customer.hasMany(Contract, {
  foreignKey: 'CustomerID',
  as: 'contracts',
});
Familiar.hasMany(Contract, {
  foreignKey: 'FamiliarID',
  as: 'contracts',
});

export {
  Wizard,
  Group,
  Customer,
  Familiar,
  Contract,
};
