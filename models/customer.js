'use strict'
const moment = require("moment")

module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define('customer', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    patronymic: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        let date = this.getDataValue("birthday")
        return date ? moment(date).format("DD.MM.YYYY") : null
      }
    },
    experience: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    major_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "major",
        key: "id"
      }
    },

    department_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "department",
        key: "id"
      }
    },

    role_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "role",
        key: "id"
      }
    }

  }, { timestamps: false })

  customer.associate = models => {

    customer.belongsTo(models.major, {
      foreignKey: "major_id",
      as: "major"
    })
    customer.belongsTo(models.department, {
      foreignKey: "department_id",
      as: "department"
    })
    customer.belongsTo(models.role, {
      foreignKey: "role_id",
      as: "role"
    })

    customer.belongsToMany(models.achievement, {
      as: 'achievements',
      through: {
        model: models.customer_achievement,
        unique: false
      },
      foreignKey: 'customer_id',
      constraints: false
    })

    customer.belongsToMany(models.post, {
      as: 'posts',
      through: {
        model: models.customer_post,
        unique: false
      },
      foreignKey: 'customer_id',
      constraints: false
    })

  }

  return customer
}