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
    first_name: {
      type: DataTypes.STRING,
      validate: {
        firtstNameLength(value) {
          if (value.length < 2) throw new Error('first name / last name harus lebih dari 2 karakter')
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
       lastNameLength(value) {
          if (value.length < 2) throw new Error('first name / last name harus lebih dari 2 karakter')
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        usernameLength(value) {
          if (value.length < 8) throw new Error('username / password harus lebih dari 8 karakter')
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        passwordLength(value) {
          if (value.length < 8) throw new Error('password / password harus lebih dari 8 karakter')
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
      User.belongsToMany(models.Item, {through: "Transcactions"})
    };
    return User;
  };