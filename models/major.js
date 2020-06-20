'use strict'

module.exports = (sequelize, Sequelize) => {
  const major = sequelize.define('major', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    major_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, { timestamps: false })

  major.associate = models => {
    major.hasMany(models.customer, { foreignKey: 'major_id' })
  }

  return major
}