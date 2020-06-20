'use strict'

module.exports = (sequelize, Sequelize) => {
  const token =  sequelize.define("token", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    refresh_token: {
      type: Sequelize.STRING,
      allowNull: false
    },

    refresh_exp: {
      type: Sequelize.DATE,
      allowNull: false
    }

  }, 
  {
    timestamps: false
  })

  return token
}