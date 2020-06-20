import fs from 'fs'
import path from 'path'
import {Sequelize, QueryTypes } from 'sequelize'

const db = {}
const basename = path.basename(__filename)

const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname + '/../config/config.json'))[env]

const cls = require('continuation-local-storage')
const ns = cls.createNamespace('models')

Sequelize.useCLS(ns)

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    
    const model = sequelize['import'](path.join(__dirname, file))
    if(typeof(model) == "object") {
      for (let modelFunction in model) {
        db[modelFunction] = model[modelFunction]
      }
    } else {
      db[model.name] = model
    }
    
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

db.sequelize = sequelize
db.Sequelize = Sequelize
db.QueryTypes =QueryTypes 

module.exports = db
