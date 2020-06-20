import { body, param, query } from 'express-validator'
import validate from './index'

exports.auth = [[
  body("username").not().isEmpty().trim().withMessage("Username cannot be empty"),
  body('password').not().isEmpty().trim().withMessage('Password cannot be empty.').isLength({min: 6}).withMessage("Your password must be at least 5 digits")
], validate]

exports.refresh = [[
  body("token").not().isEmpty().trim().withMessage("Token cannot be empty"),
  body("refreshToken").not().isEmpty().trim().withMessage("Refresh token cannot be empty")
], validate]