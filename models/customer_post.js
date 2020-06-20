'use strict'

module.exports = (sequelize, Sequelize) => {
  const customer_post = sequelize.define('customer_post', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },

    customer_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "customer",
        key: "id"
      }
    },

    post_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "post",
        key: "id"
      }
    },

    vote: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }

  }, { timestamps: false })

  return customer_post
}