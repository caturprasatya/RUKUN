'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/useBcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Suggestion)
      User.hasMany(models.Transaction)
      User.hasOne(models.Village)
      User.belongsTo(models.Village)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        passwordLength(value){
          if(value.length < 6) throw Error('More than six characters are required')
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Role is required"
        }
      }
    },
    push_token: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Token is required"
        }
      }
    },
    VillageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, option){
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};