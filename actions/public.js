import logger from 'logger'
import { Sequelize, sequelize, role, major, department, achievement } from 'models'
import { NotFoundError, CustomError } from 'handle-error'
import moment from "moment"
import { dataToJson, deleteFile } from 'helpers'
import Result from 'result'
import { getBaseUrl } from 'utils/'

const fs = require("fs");
const Op = Sequelize.Op;

export const roles = async (res) => {
  let transaction
  try {
    transaction = await sequelize.transaction() 

    let roles = await role.findAll({})
    if(!roles){
      res.result = []
      return
    }

    res.result = roles
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
      res.result = []
      return
    }

    res.result = majors
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
      res.result = []
      return
    }

    res.result = departments
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

    let achievements = await department.findAll({})
    if(!achievements){
      res.result = []
      return
    }

    res.result = achievements
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