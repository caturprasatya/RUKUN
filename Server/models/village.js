'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    
    static associate(models) {
      Village.hasMany(models.Suggestion, { foreignKey: 'VillageId' })
      Village.hasMany(models.Transaction, { foreignKey: 'VillageId' })
      Village.hasMany(models.User, { foreignKey: 'VillageId' })
      Village.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  Village.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    invitation_code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Invitation Code is required"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Location is required"
        }
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Balance is required"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Village',
  });
  return Village;
};