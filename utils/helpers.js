import fs from 'fs'
import logger from 'logger'
import { sequelize, Sequelize} from 'models'
import { CustomError } from 'handle-error'

const Op = Sequelize.Op;

export const dataToJson = (data) => {
  if (Array.isArray(data)) {
    return data.map(data => data.toJSON())
  }
  else {
    return data.toJSON()
  }
}

export const deleteFile = (url, folder) => {
  let isFileExists = false
  let filePath = ''
  try {
    const fileNameParts = url.split('/')
    filePath = `./public/uploads/${folder}/${fileNameParts[fileNameParts.length - 1]}`
    fs.accessSync(filePath)
    isFileExists = true
  }
  catch (error) {
    logger.error({
      name: 'NotFoundError',
      message: 'File does not exist',
      filePath,
      location: 'utils/helpers.js (deleteFile)'
    })
  }
  if (isFileExists && filePath) {
    try {
      fs.unlinkSync(filePath)
    }
    catch (error) {
      logger.error({
        name: 'UnprocessableError',
        message: 'Error deliting file',
        location: 'utils/helpers.js (deleteFile)'
      })
    }
  }
}

export const generateRandomCode = length => {
  let possible = '0123456789'
  let string = ''
  for (let i = 0; i < length; i++) {
    string += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return string
}

export const genPassword = len => {
  var password = "";
  var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return password;
}

export const isEmpty = (e) => {
  switch (e) {
    case "":
    case '""':
    case null:
    case 'null':
    case undefined:
    case 'undefined':
      return true;
    default:
      return false;
  }
}