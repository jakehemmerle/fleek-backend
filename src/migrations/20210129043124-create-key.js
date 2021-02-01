'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Keys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      enabled: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      requestCount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      totalBytesTransfered: {
        defaultValue: 0,
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Keys');
  }
};