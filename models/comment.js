'use strict'
const moment = require("moment")

module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define('comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },

    customer_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },

    post_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },

    text: {
      allowNull: false,
      type: Sequelize.STRING
    },

  }, { timestamps: false })

  comment.associate = models => {
    comment.belongsTo(models.customer, {
      foreignKey: "customer_id",
      as: "customer"
    })

    comment.belongsTo(models.post, {
      foreignKey: "post_id",
      as: "post"
    })

  }

  return comment
}