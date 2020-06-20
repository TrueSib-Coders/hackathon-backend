import logger from 'logger'
import Result from 'result'
import { Strategy as JwtStrategy, ExtractJwt, } from 'passport-jwt'
import { Strategy as AnonymousStrategy } from "passport-anonymous"
import { customer, Role } from 'models'
import { ForbiddenError, UnauthorizedError } from 'handle-error'
import { dataToJson } from 'utils/helpers'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import jwt from 'jsonwebtoken'
import passport from "passport"



export const authorize = (allowAnonymous = false, ...role) => {
  return [passport.authenticate(allowAnonymous ? ["jwt", "anon"] : "jwt", { session: false }), checkRoles(...role)]
}

export const checkRoles = (...role) => {
  return async (req, res, next) => {
    try {
      if (!role) {
        return next()
      }
      if (!role.length) {
        return next()
      }

      if (!req.user) {
        return next(new (UnauthorizedError()))
      }

      if (req.user.role != null) {
        let userRole = req.user.role

        console.log(111, userRole);
        console.log(333, role);

        if (userRole.role_name == role) {
          return next()
        } else {
          return next(new ForbiddenError())
        }
      } else {
        return next(new ForbiddenError())
      }

    }
    catch (error) {
      return next(error)
    }
  }
}

export const useAuth = (app, passport) => {
  app.use(passport.initialize());

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: true,
    passReqToCallback: true
  }

  const authStrategy = new JwtStrategy(jwtOptions, async (req, payload, done) => {
    let result = new Result()

    try {

      if (new Date(payload.exp * 1000) < new Date()) {
        req.res.set("Token-Expired", "true")
        req.res.set("Access-Control-Expose-Headers", "Token-Expired")
        result.setForbidden()
        return done(null, false, result)
      }

      if (payload.customer_id !== null) {
        return done(null, { id: payload.customer_id, role: payload.role })
      }

    }
    catch (error) {
      result.setServerError()
      return done(null, false, result)
    }
  })

  passport.use("jwt", authStrategy)

  passport.use("anon", new AnonymousStrategy())

}

export default useAuth