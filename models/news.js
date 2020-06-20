'use strict'
const moment = require("moment")

module.exports = (sequelize, Sequelize) => {
  const news = sequelize.define('news', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        let date = this.getDataValue("date")
        return date ? moment(date).format("DD.MM.YYYY") : null
      }
    },
  }, { timestamps: false })


  return news
}