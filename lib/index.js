const jsonServer = require('json-server')
const expressJwt = require('express-jwt')

const config = require('./config')
const data = require('./data')
const user = require('./user')
const token = require('./token')

// init db file
const dbFilename = data.initDatabase()

const server = jsonServer.create()
const router = jsonServer.router(dbFilename)

// Token authorize
const tokenAuthorize = expressJwt({
  secret: config.secret,
  audience: config.audience,
  issuer: config.issuer,
  credentialsRequired: false,
  getToken: token.getToken,
  isRevoked: (req, payload, done) => done(null, data.isRevokedToken(payload))
})

// Role authorize
const roleAuthorize = (req, res, next) => {
  if (!req.user) return res.status(401).send({ message: 'Requires authentication.' })

  // TODO: delete token or logout
  data.getUserBySlug(req.user.slug).then(user => {
    if (user.roles.includes('administrator')) return next()
    res.status(403).send({ message: 'Requires administrator.' })
  })
}

// Common middlewares
server.use(jsonServer.defaults())
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  // enable?
  if (!config.enableDelay) return next()
  // ignore options request
  if (req.method === 'OPTIONS') return next()
  setTimeout(next, Math.random() * 1000)
})

// backdoor: Toggle delay action
server.get('/backdoor/delay', (req, res) => {
  config.enableDelay = !config.enableDelay
  res.send(config.enableDelay)
})

// backdoor: Reset database
server.get('/backdoor/reset', (req, res) => {
  data.initDatabase()
  router.db.read()
  res.send('The database has been reset')
})

// Create token
server.post('/tokens', token.create)

// Check token
server.get('/tokens/:token?', tokenAuthorize, token.check)

// Revoke token
server.delete('/tokens/:token?', tokenAuthorize, token.revoke)

// Get login user
server.get('/users/me', tokenAuthorize, user.me)

// Use default json server router
server.use(tokenAuthorize, roleAuthorize, router)

// Friendly error output
server.use((err, req, res, next) => {
  if (err.name !== 'UnauthorizedError') return next(err)
  res.status(401).send({ message: err.message })
})

module.exports = server

/**
 * full fake REST API with json-server
 * https://github.com/typicode/json-server#module
 * https://www.ibm.com/developerworks/cn/web/1103_chenyan_restapi/
 * https://blog.jobbole.com/41233/
 * https://github.com/auth0/express-jwt
 * https://github.com/auth0-blog/nodejs-jwt-authentication-sample
 * https://github.com/auth0/express-jwt
 * http://ngionic.com/2015/06/%E5%9F%BA%E4%BA%8Ejson%E7%9A%84web-token%E7%9A%84nodejs-api%E9%AA%8C%E8%AF%81%E5%AE%9E%E4%BE%8B/
 * http://hao.jser.com/archive/8137/
 * https://github.com/hokaccha/node-jwt-simple
 * http://www.haomou.net/2014/08/13/2014_web_token/
 */
