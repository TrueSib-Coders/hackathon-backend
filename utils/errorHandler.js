
import Result from 'result'
import logger from 'logger'

export function CustomError(message) {
  Error.call(this, message)
  this.name = 'CustomError'
  this.message = message

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, CustomError)
  }
  else {
    this.stack = (new Error()).stack
  }
}

export function UnauthorizedError(message) {
  Error.call(this, message)
  this.name = 'UnauthorizedError'
  this.message = message || 'Пользователь не авторизован'

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, UnauthorizedError)
  }
  else {
    this.stack = (new Error()).stack
  }
}

export function ForbiddenError(message) {
  Error.call(this, message)
  this.name = 'ForbiddenError'
  this.message = message || 'Недостаточно прав'

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ForbiddenError)
  }
  else {
    this.stack = (new Error()).stack
  }
}

export function NotFoundError(message) {
  Error.call(this, message)
  this.name = 'NotFoundError'
  this.message = message || 'Объект не найден'

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, NotFoundError)
  }
  else {
    this.stack = (new Error()).stack
  }
}

export function ValidationError(fields) {
  Error.call(this, fields)
  this.name = 'ValidationError'
  this.message = 'Ошибка при валидации'
  this.fields = fields

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ValidationError)
  }
  else {
    this.stack = (new Error()).stack
  }
}

const getMetaFromError = error => {
  try {
    const { stack } = error
    let info = stack.split('\n')[1].split('\\')
    let meta = info[info.length - 1]
    let fileName = meta.split(':')[0]
    let lineNumber = meta.split(':')[1]
    return `${fileName}: ${lineNumber}`
  }
  catch {
    return null
  }
}

const errorHandler = (error, req, res, next) => {
  let result = new Result()
  if (error) {
    if (!['ValidationError', 'NotFoundError'].includes(error.name)) {
      const location = getMetaFromError(error)
      logger.error(Object.assign(
        { name: error.name },
        error.message ? { message: error.message } : {},
        location ? { location } : {})
      )
    }
    switch (error.name) {
      case 'CustomError':
        result.setUnprocessable()
        result.setErrorMessage(error.message)
        break
      case 'UnauthorizedError':
        result.setUnauthorized()
        if (error.message) {
          result.setErrorMessage(error.message)
        }
        break
      case 'ForbiddenError':
        result.setForbidden()
        break
      case 'NotFoundError':
        result.setNotFound()
        if (error.message) {
          result.setErrorMessage(error.message)
        }
        break
      case 'ValidationError':
        result.setUnprocessable()
        result.setError({ fields: error.fields })
        break
      default:
        result.setServerError()
        break
    }
  }
  else {
    logger.error({ message: 'Data Not Found' })
    result.setUnknownError()
  }
  res.status(result.status).send(result)
}

export default errorHandler