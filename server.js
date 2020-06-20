import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import errorHandler from 'handle-error'
import useAuth from "auth/config"
import passport from "passport"
import useApi from "handlers"
import logger from "logger"
import { generateRandomCode } from 'helpers'

const dev = process.env.NODE_ENV !== 'production'
var app = express({ dev })

app.set('port', process.env.PORT || 3029)
app.set('host', process.env.HOST || 'localhost')

app.use(cors())
app.use(fileUpload({ createParentPath: true, parseNested: true }))
app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const loggingMiddleware = (req, res, next) => {
  let id = generateRandomCode(4);
  logger.info(`Request ${req.method} ${id}: ${req.originalUrl}, query: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}`)
  let oldWrite = res.write;
  let oldEnd = res.end;

  let chunks = []
  
  res.write = function (chunk) {
    chunks.push(Buffer.from(chank));

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(Buffer.from(chunk));

    let body = Buffer.concat(chunks).toString('utf8');
    logger.info(`Response ${req.method} ${id}: ${req.originalUrl}, response: ${body}`)

    oldEnd.apply(res, arguments);
  };

  next();
}

app.use(loggingMiddleware)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

useAuth(app, passport)
useApi(app, passport)

app.use(errorHandler)

app.listen(app.get('port'), app.get('192.168.1.6'), () => {
  if (dev) {
    console.log(`API server Hackathon started on http://${app.get('host')}:${app.get('port')}`)
  }
})