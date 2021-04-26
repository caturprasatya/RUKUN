'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    
    static associate(models) {
      Transaction.belongsTo(models.User, { foreignKey: 'UserId' })
      Transaction.belongsTo(models.Village, { foreignKey: 'VillageId' })
    }
  };
  Transaction.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required"
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Category is required"
        }
      }
    },
    note: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Note is required"
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Type is required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is required"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    VillageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};