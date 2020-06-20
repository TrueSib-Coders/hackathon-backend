'use strict'

module.exports = (sequelize, Sequelize) => {
  const categories = sequelize.define('categories', {
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
  }, { timestamps: false })

return categories
}