'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    
    static associate(models) {
      Suggestion.belongsTo(models.User, { foreignKey: 'UserId' })
      Suggestion.belongsTo(models.Village, { foreignKey: 'VillageId' })
    }
  };
  Suggestion.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description is required"
        }
      }
    },
    type:{
      type: DataTypes.STRING,
      defaultValue: "suggestions"
    },
    UserId: DataTypes.INTEGER,
    VillageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Suggestion',
  });
  return Suggestion;
};