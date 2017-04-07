/**
 * full fake REST API with json-server
 * https://github.com/typicode/json-server#module
 * https://www.ibm.com/developerworks/cn/web/1103_chenyan_restapi/
 * http://blog.jobbole.com/41233/
 * https://github.com/auth0/express-jwt
 * https://github.com/auth0-blog/nodejs-jwt-authentication-sample
 */

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const delay = require('./delay')
const authorize = require('./authorize')
const users = require('./users')
const jsonServer = require('./json-server')

const port = process.env.PORT || 2080

const app = module.exports = express()

app.use(delay())
app.use(cors())
app.use(morgan('dev'))
app.use(authorize())
app.use(users())
app.use(jsonServer())

if (!module.parent) {
  app.listen(port, err => {
    if (err) throw err
    console.log(`> API Serve in http://localhost:${port}/`)
  })
}
