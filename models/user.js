'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class User extends Model {
    name() {
      return `${this.first_name} ${this.last_name}`
    }
  }
  
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        passwordLength(value) {
          if (value.length < 8) throw new Error('password harus lebih dari 8 karakter')
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (data, options) => {
        if (!data.last_name) {
          data.last_name = data.first_name
        }
      }
    },sequelize});
    
    User.associate = function(models) {
      User.belongsToMany(models.Item, {through: "Transaction"})
    };
    return User;
  };