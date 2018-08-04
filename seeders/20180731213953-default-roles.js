'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('Roles', [
        {
          name: 'master',
          displayName: "Master",
          description: "Master with all privileges",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'admin',
          displayName: "Admin",
          description: "Admin with all privileges instead of this which can Master",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'user',
          displayName: "User",
          description: "User with normal privileges",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'support',
          displayName: "Support",
          description: "User with privileges to write with clients.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
