const os = require('os')
const fs = require('fs')
const path = require('path')

const faker = require('./faker')

// TODO: Revoked tokens store
const revokedTokens = []

const fallbackUsers = [
  {
    slug: 'zce',
    username: 'zce',
    password: 'wanglei',
    email: 'w@zce.me',
    name: 'Wang Lei',
    status: 'activated',
    roles: [ 'administrator' ],
    meta: { avatar: 'https://img.zce.me/faker.svg' }
  },
  {
    slug: 'admin',
    username: 'admin',
    password: 'admin',
    name: 'Admin',
    status: 'activated',
    roles: [ 'administrator' ],
    meta: { avatar: 'https://img.zce.me/faker.svg' }
  },
  {
    slug: 'demo',
    username: 'demo',
    password: 'demo',
    name: 'Demo',
    status: 'forbidden',
    roles: [ 'administrator' ],
    meta: { avatar: 'https://img.zce.me/faker.svg' }
  }
]

const dbFilename = path.join(os.tmpdir(), 'db.json')

const init = () => {
  const data = faker()
  fs.writeFileSync(dbFilename, JSON.stringify(data))
  return dbFilename
}

const getDatabase = () => {
  const content = fs.readFileSync(dbFilename, 'utf8')
  return JSON.parse(content)
}

const getUsers = () => {
  const db = getDatabase()
  db.users = db.users || []
  return db.users.concat(fallbackUsers)
}

const getUserBySlug = slug => {
  const users = getUsers()
  return users.find(u => u.slug === slug)
}

const getUserByUsername = username => {
  const users = getUsers()
  return users.find(u => u.username.toLowerCase() === username.toLowerCase())
}

const revokeToken = payload => payload && payload.uuid && revokedTokens.push(payload.uuid)

const isRevokedToken = payload => payload && payload.uuid && revokedTokens.includes(payload.uuid)

module.exports = { init, getDatabase, getUserBySlug, getUserByUsername, revokeToken, isRevokedToken }
