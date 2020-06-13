const sequelize = require("./sequelize-db");
const { Sequelize, Model } = require('sequelize');

class User extends Model {}

User.init({
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
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;