'use strict'

module.exports = (sequelize, Sequelize) => {
  const role = sequelize.define('role', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    role_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, { timestamps: false})

  role.associate = models => {
    role.hasMany(models.customer, { foreignKey: 'role_id' })
  }

  return role
}