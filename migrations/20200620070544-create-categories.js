'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentCode: {
        type: Sequelize.STRING,
        allowNull: false
      }

    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('categories')
  }
}