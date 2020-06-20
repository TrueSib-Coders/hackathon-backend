import logger from 'logger'
import { Sequelize, sequelize, role, major, department, achievement } from 'models'
import { NotFoundError, CustomError } from 'handle-error'
import moment from "moment"
import { dataToJson, deleteFile } from 'helpers'
import Result from 'result'
import { getBaseUrl } from 'utils/'

const Op = Sequelize.Op;

export const roles = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction() 

    let roles = await role.findAll({})
    if(!roles){
      res.data = []
      return
    }

    res.data = roles
    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    throw error
  }
}

export const majors = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction() 

    let majors = await major.findAll({})
    if(!majors){
      res.data = []
      return
    }

    res.data = majors
    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    throw error
  }
}

export const departments = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction() 

    let departments = await department.findAll({})
    if(!departments){
      res.data = []
      return
    }

    res.data = departments
    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    throw error
  }
}

export const achievements = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction() 

    let achievements = await achievement.findAll({})
    if(!achievements){
      res.data = []
      return
    }

    res.data = achievements
    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    throw error
  }
}