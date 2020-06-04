'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Item extends Model {
    expDate(){
      let str = this.exp_date.toString()
      let date = str.slice(0,15)
      return date
    }
  }
  
  Item.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        firtstNameLength(value) {
          if (value.length < 2) throw new Error('name harus lebih dari 2 karakter')
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        firtstNameLength(value) {
          if (value < 1) throw new Error('price tidak boleh 0 (nol)')
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        quantity(value) {
          if (value < 1) throw new Error('quantity tidak boleh 0 (nol)')
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        firtstNameLength(value) {
          if (value.length < 2) throw new Error('type harus lebih dari 2 karakter')
        }
      }
    },
    exp_date: DataTypes.DATE
  }, {sequelize});
  
  Item.associate = function(models) {
    Item.belongsToMany(models.User, {through: "Transcactions"})
  };
  return Item;
};