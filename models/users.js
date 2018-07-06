'use strict';
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_permissions_delete: {
      type: DataTypes.BOOLEAN,
      default: false
  },
}, {
  paranoid: true,
    hooks: {
      beforeCreate: (user) => {
        new Promise((resolve, reject) => {
          user.password = crypto.pbkdf2Sync(user.password, config.tokenSecret, 1000, 64, `sha512`).toString(`hex`);

          resolve(user);
        });
      }
    }
});

users.prototype.validPassword = function(password) {
  return new Promise((resolve, reject) => {
    let hash = crypto.pbkdf2Sync(password, config.tokenSecret, 1000, 64, `sha512`).toString(`hex`);
    resolve((hash === this.password)? true : false);
  });
};
  return users;
};