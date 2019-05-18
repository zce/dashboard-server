const uuid = require('uuid')
const jsonwebtoken = require('jsonwebtoken')

const config = require('./config')
const data = require('./data')

const getToken = req => {
  // custom token schema
  if (!req.headers.authorization) return null
  const temp = req.headers.authorization.split(' ')
  const types = ['Bearer', 'JWT']
  if (types.includes(temp[0])) return temp[1]
  if (req.params.token) return req.params.token
  return req.query.token
}

const create = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send({ message: 'You must send the username and the password.' })
  }

  const user = data.getUserByUsername(username)

  // exists user
  if (!user) {
    return res.status(401).send({ message: 'Incorrect username or password.' })
  }

  // password match
  if (user.password !== password) {
    return res.status(401).send({ message: 'Incorrect username or password.' })
  }

  // check status
  if (user.status === 'forbidden') {
    return res.status(401).send({ message: 'Your account is forbidden.' })
  }

  // TODO: filter user info
  const payload = { slug: user.slug, uuid: uuid() }
  const token = jsonwebtoken.sign(payload, config.secret, { expiresIn: config.expires, audience: config.audience, issuer: config.issuer })

  res.status(201).send({ token })
}

const check = (req, res) => {
  if (!req.user) return res.status(401).send({ message: 'Token is invalidated.' })
  res.status(200).send({ message: 'Token is validated.' })
}

const revoke = (req, res) => {
  const token = getToken(req)
  const payload = jsonwebtoken.decode(token)
  data.revokeToken(payload)
  res.status(200).send({ message: 'Revocation token success.' })
}

module.exports = { getToken, create, check, revoke }
