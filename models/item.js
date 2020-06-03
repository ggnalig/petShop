'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Item extends Model {}

  Item.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    exp_date: DataTypes.DATE
  }, {sequelize});
  
  Item.associate = function(models) {
    Item.belongsToMany(models.User, {through: "Transaction"})
  };
  return Item;
};