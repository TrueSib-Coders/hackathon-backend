'use strict'

module.exports = (sequelize, Sequelize) => {
  const department = sequelize.define('department', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    department_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, { timestamps: false})

  department.associate = models => {
    department.hasMany(models.customer, { foreignKey: 'department_id' })
  }

  return department
}