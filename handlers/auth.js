import express from 'express';
import { login, refreshToken } from "actions/auth"
import Result from 'result'
import logger from 'logger'
import { NotFoundError, UnauthorizedError, CustomError } from 'handle-error'

import userValidator from "validators/authUser"

const generateHtml = async (req, res) => {
  let { token, refreshToken } = await action.generateToken(req.user.id)
  const htmlWithJwt = `
    <html>
      <script>
        window.localStorage.setItem("token", '${token}')
        window.localStorage.setItem("refresh_token", '${refreshToken}')
        localStorage.setItem("token", '${token}')
        window.location.href = '${process.env.OAUTH_REDIRECT}'
      </script>
    </html>
    `
  return res.send(htmlWithJwt)
}


const router = express.Router();

router.post("/token/refresh", userValidator.refresh, async (req, res, next) => {
  try {
    let result = await refreshToken(req.body)
    res.status(result.status).send(result)
  } catch (error) {
    next(error)
  }
})

router.post("/customer/authorization", userValidator.auth, async (req, res, next) => {
  try {
    let result = new Result()
    let data = { password: req.body.password }

    data.username = req.body.username
    await login(result, data)
    res.status(result.status).send(result)
  }
  catch (error) {
    next(error)
  }
})

export default router
