import auth from "./auth"
import customer from "./customer"
import admin from "./admin"
import publicHandlers from "./public"
import { authorize } from "auth/config"
import { ROLES } from 'utils/enums'

function api(server, passport) {

  server.use("/api/v1", auth)

  server.use("/api/v1/customer", authorize(false), customer)

  server.use("/api/v1/admin", authorize(false, ROLES.Admin), admin)

  server.use("/api/v1/public", authorize(true), publicHandlers)

}

module.exports = api