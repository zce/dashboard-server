/**
 * https://github.com/auth0/express-jwt
 * http://ngionic.com/2015/06/%E5%9F%BA%E4%BA%8Ejson%E7%9A%84web-token%E7%9A%84nodejs-api%E9%AA%8C%E8%AF%81%E5%AE%9E%E4%BE%8B/
 * http://hao.jser.com/archive/8137/
 * https://github.com/hokaccha/node-jwt-simple
 * http://www.haomou.net/2014/08/13/2014_web_token/
 */

const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const { omit } = require('lodash')
const { Router } = require('express')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const config = require('./config')
const utils = require('./utils')

// TODO: Revoked tokens store
const revokedTokens = []

function getTokenFromRequest (req) {
  // custom token schema
  if (!req.headers.authorization) return null
  const temp = req.headers.authorization.split(' ')
  const types = ['Bearer', 'JWT']
  if (types.includes(temp[0])) return temp[1]
  return req.params.token
}

const jwtAuthorize = [
  expressJwt({
    secret: config.secret,
    audience: config.audience,
    issuer: config.issuer,
    credentialsRequired: false,
    getToken: getTokenFromRequest,
    isRevoked (req, payload, done) {
      // revoke token
      done(null, revokedTokens.includes(payload.uuid))
    }
  }),
  (req, res, next) => {
    if (!req.user) return res.status(401).send({ message: 'Requires authentication.' })
    // TODO: delete token or logout
    if (req.user.roles.includes('administrator')) return next()
    res.status(403).send({ message: 'Requires administrator.' })
  }
]

const router = new Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// create token
router.post('/tokens', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send({ message: 'You must send the username and the password.' })
  }

  utils.getUsers((err, users) => {
    if (err) {
      return res.status(401).send({ message: 'Incorrect username or password.' })
    }

    const user = users.find(u => u.username === username)

    if (!user) {
      return res.status(401).send({ message: 'Incorrect username or password.' })
    }

    if (user.password !== password) {
      return res.status(401).send({ message: 'Incorrect username or password.' })
    }

    // TODO: filter user info
    const payload = omit(user, ['id', 'username', 'password', 'email', 'phone', 'name', 'status', 'created', 'updated', 'meta'])
    payload.uuid = uuid()
    const token = jwt.sign(payload, config.secret, { expiresIn: config.expires, audience: config.audience, issuer: config.issuer })

    res.status(201).send({ token })
  })
})

// check token
router.get('/tokens', ...jwtAuthorize, (req, res) => {
  res.status(200).send({ message: 'Token is validated.' })
})

// delete token
router.delete('/tokens/:token?', (req, res) => {
  const token = getTokenFromRequest(req)
  const decoded = jwt.decode(token)
  revokedTokens.push(decoded.uuid)
  res.status(200).send({ message: 'Revocation token success.' })
})

// authorize middlewares
const middlewares = [
  // create user token
  router,
  // token validate
  ...jwtAuthorize,
  // friendly error output
  (err, req, res, next) => {
    if (err.name !== 'UnauthorizedError') return next(err)
    res.status(401).send({ message: err.message })
  }
]

module.exports = () => middlewares
