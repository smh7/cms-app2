'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cards = sequelize.define('Cards', {
    card_img_top: DataTypes.STRING,
    card_title: DataTypes.STRING,
    card_text: DataTypes.STRING,
    list_group1: DataTypes.STRING,
    list_group2: DataTypes.STRING,
    list_group3: DataTypes.STRING
  }, {});
  Cards.associate = function(models) {
    // associations can be defined here
  };
  return Cards;
};