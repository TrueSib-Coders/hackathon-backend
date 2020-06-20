'use strict'

module.exports = (sequelize, Sequelize) => {
  const customer_achievement = sequelize.define('customer_achievement', {
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

    achievement_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "achievement",
        key: "id"
      }
    }

  }, { timestamps: false })

  return customer_achievement
}