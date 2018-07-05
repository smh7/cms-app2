'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_img_top: {
        type: Sequelize.STRING
      },
      card_title: {
        type: Sequelize.STRING
      },
      card_text: {
        type: Sequelize.STRING
      },
      list_group1: {
        type: Sequelize.STRING
      },
      list_group2: {
        type: Sequelize.STRING
      },
      list_group3: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cards');
  }
};