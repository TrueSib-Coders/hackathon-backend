import Result from 'result'
import { Sequelize, sequelize, customer, role, token, major, department } from 'models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import logger from 'logger'
import { NotFoundError, UnauthorizedError, ForbiddenError } from 'handle-error'
import moment from "moment"
import { dataToJson } from 'helpers'

const Op = Sequelize.Op;

exports.generateToken = async (customer_id) => {
  let user = await customer.findOne({
    where: {
      id: customer_id
    },
    include: [
      {
        model: role,
        as: 'role',
        required: false,
        duplicating: false
      },
    ]
  })

  if (!user) {
    throw new NotFoundError()
  }
  await token.destroy({
    where: {
      customer_id: user.id
    }
  })

  let refreshToken = uuidv4()
  let customerToken = jwt.sign({ customer_id: customer.id, role: customer.role }, process.env.JWT_SECRET, { expiresIn: 1800 })

  await token.create({
    refreshToken: refreshToken,
    customer_id: user.id,
    refreshTokenExp: moment().add(7, "days")
  })

  return { token: customerToken, refreshToken }

}

exports.refreshToken = async (body) => {
  let result = new Result()

  let decoded = null
  try {
    decoded = jwt.verify(body.token, process.env.JWT_SECRET, { ignoreExpiration: true })
  } catch (err) {
    throw new ForbiddenError("Wrong token")
  }

  let tokens = await token.findOne({
    where: {
      [Op.and]: [{ customer_id: decoded.customer_id }]
    }
  })

  logger.info("Запрос на токен: ")

  if (!tokens) {
    logger.info("Токен не найден в базе")
    throw new ForbiddenError("Неверный токен")
  }

  if (tokens.refreshToken != body.refreshToken) {
    logger.info("Токен не совпадает")
    logger.info("Токен в базе: " + tokens.refreshToken);
    logger.info("Token переданный: " + body.refreshToken)
    throw new ForbiddenError("Неверный токен")
  }

  if (moment() > tokens.refreshTokenExp) {
    logger.info("Токен устарел")
    throw new ForbiddenError("Неверный токен")
  }

  let newRefreshToken = uuidv4()
  let newToken = jwt.sign({ customer_id: decoded.customer_id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_LIFE_TIME) })

  tokens.refreshToken = newRefreshToken
  tokens.refreshTokenExp = moment().add(7, "days")
  await tokens.save()

  result.result = {
    token: newToken,
    refreshToken: newRefreshToken
  }

  return result
}

export const login = async (res, data) => {
  let transaction
  try {

    transaction = await sequelize.transaction()

    const { username, password } = data

    let user = await customer.findOne({
      where: {
        username: username
      },
      include: [
        {
          model: role,
          as: 'role',
          required: true,
        },
        {
          model: major,
          as: 'major',
          required: true,
        },
        {
          model: department,
          as: 'department',
          required: true,
        }
      ]
    })

    if (!user) {
      throw new UnauthorizedError('Неверный логин или пароль')
    }
    console.log(1111, dataToJson(user));

    let tokenData = await token.findOne({
      where: {
        username: username
      }
    })

    if (bcrypt.compareSync(password, tokenData.dataValues.password)) {
      let refreshToken = uuidv4()
      let tokenNew = jwt.sign({ customer_id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: 3600 })

      console.log(1, tokenData.id);

      let updateToken = await tokenData.update({ refreshToken: refreshToken, refreshTokenExp: moment().add(7, "days") }, { transaction })

      console.log(3);

      user = dataToJson(user)

      delete user.role_id
      delete user.major_id
      delete user.department_id

      res.result = {
        token: tokenNew,
        refreshToken: updateToken.refreshToken,
        /*         customer: {
                  id: user.id,
                  name: user.name,
                  surname: user.surname,
                  role: role,
                  major: major,
                  department: department,
                } */
        customer: user
      }
      console.log(11111, res);

    } else {

      throw new UnauthorizedError("Неверный логин или пароль")
    }

    await transaction.commit()
    return
  }
  catch (error) {
    if (transaction) {
      await transaction.rollback()
    }
    logger.error({
      name: 'Unauthorized Error',
      message: error,
      location: 'actions/auth.js (login Email)'
    })
    throw error
  }
  return
}