import { ValidationError } from 'handle-error'
import { validationResult } from 'express-validator'

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return { [error.param]: error.msg }
  }
})

export const validate = (req, res, next) => {
  const errors = customValidationResult(req).array()
  if (errors && errors.length && errors.length > 0) {
    let errorObject = {}
    errors.forEach(error => {
      for (const key in error) {
        errorObject[key] = error[key]
      }
    })
    return next(new ValidationError(errorObject))
  }
  return next()
}

export default validate
