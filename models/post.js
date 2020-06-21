'use strict'
const moment = require("moment")

module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define('post', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    image_link: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    favorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },


    date: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        let date = this.getDataValue("date")
        return date ? moment(date).format("DD.MM.YYYY") : null
      }
    },

    customer_id: {
      allowNull: true,
      type: Sequelize.INTEGER
    },

    department_id: {
      allowNull: true,
      type: Sequelize.INTEGER
    },

    tags: {
      allowNull: true,
      type: Sequelize.ARRAY(Sequelize.TEXT)
    }

  }, { timestamps: false })

  post.associate = models => {
    post.belongsToMany(models.customer, {
      as: 'customers',
      through: {
        model: models.customer_post,
        unique: false
      },
      foreignKey: 'post_id',
      constraints: false
    })

    post.hasMany(models.comment, { foreignKey: 'post_id' })

  }

  return post
}