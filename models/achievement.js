'use strict'

module.exports = (sequelize, Sequelize) => {
  const achievement = sequelize.define('achievement', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    achievement_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    reward: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }, { timestamps: false })

  achievement.associate = models => {
    achievement.belongsToMany(models.customer, {
      as: 'customers',
      through: {
        model: models.customer_achievement,
        unique: false
      },
      foreignKey: 'achievement_id',
      constraints: false
    })

  }

  return achievement
}