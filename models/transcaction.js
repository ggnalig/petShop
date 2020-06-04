'use strict';
const {Item} = require('./item')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Transcaction extends Model {}
  
  Transcaction.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    quantity:{
      type: DataTypes.INTEGER,
      validate: {
        quantity(value) {
          if (value < 1) throw new Error('quantity tidak boleh 0 (nol)')
        }
      }
    },
    total: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {hooks:{
      beforeCreate: (data, options) => {
        if (!data.total) {
          data.total = data.quantity * data.price
        }
      }
    },sequelize});
    
    Transcaction.associate = function(models) {
      Transcaction.belongsTo(models.Item)
      Transcaction.belongsTo(models.User)
    };
    return Transcaction;
  };