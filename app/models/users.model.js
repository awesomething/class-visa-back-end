const sequelize = require("./sequelize-db");
const { Sequelize, Model } = require('sequelize');
const Base = require("./base.model");

class User extends Base { }

User.init('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  account_status: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    defaultValue: 0,
  },
  is_active: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    defaultValue: 1,
  },
  type: {
    type: Sequelize.INTEGER(3),
    allowNull: false,
    defaultValue: 0
  },
  referred_by: {
    type: Sequelize.STRING,
  }
});

User.beforeCreate(async (user, options) => {
    const password = await hashPassword(user.password);

    const { email, referred_by } = user;
    
    return {
        email,
        password,
        referred_by,
    };
});

User.beforeUpdate(async (user, options) => {
  const password = await hashPassword(user.password);

  const { type, account_status, is_active } = user;
  
  return {
      password,
      type,
      account_status,
      is_active,
  };
});

module.exports = User;