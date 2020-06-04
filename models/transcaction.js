'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Transcaction extends Model {}
  
  Transcaction.init({
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {sequelize});
    
    Transcaction.associate = function(models) {
      Transcaction.belongsTo(models.Item)
      Transcaction.belongsTo(models.User)
    };
    return Transcaction;
  };