'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Cards', [{
      card_img_top: "img src='/maine.jpg",
      card_title: "Maine",
      card_text: "Wherin, whereupon, we look for, struggle for a means of expression, or at least something to prop up",
      list_group1: "Speakers: 1.1 million",
      list_group2: "a fine and fitting",
      list_group3: "point"
    }], {}),


  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Cards', null, {});
  }
}
};
