'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [
      key1,
    ] = await queryInterface.bulkInsert('Keys', [
      {
        key: 'DemoToken',
        enabled: true,
        requestCount: 0,
        totalBytesTransfered: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], { returning: true })

  await queryInterface.bulkInsert('Requests', [
    {
      keyId: key1.id,
      type: 'DemoEntry',
      size: 0, // not tracking them yet
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], { returning: true });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    // chain promises
    await queryInterface.bulkDelete('Users', null, {}),
    await queryInterface.bulkDelete('Requests', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
