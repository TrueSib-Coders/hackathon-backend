import { format, transports, createLogger } from "winston"
import 'winston-daily-rotate-file'

const { combine, colorize, align, timestamp, printf } = format

const myFormat = printf(({ level, message, timestamp, ...args }) => {
  return `${timestamp} [${level}] ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`
})

const options = {
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === "production" ? "error" : "debug",
      format: combine(timestamp(), colorize(), align(), myFormat)
    }),
    new transports.DailyRotateFile({
      lever: 'debug',
      dirname: 'logs',
      filename: '%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      format: combine(timestamp(), align(), myFormat)
    })
  ]
}

const logger = createLogger(options)

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level")
}

export default logger