const fs = require('fs')
const path = require('path')

// TODO: Revoked tokens store
const revokedTokens = []

const fallbackUsers = [
  {
    slug: 'zce',
    name: '汪磊',
    username: 'zce',
    password: 'wanglei',
    roles: [ 'administrator' ],
    meta: { avatar: 'https://img.zce.me/faker.svg' }
  },
  {
    slug: 'admin',
    name: 'Admin',
    username: 'admin',
    password: 'admin',
    roles: [ 'administrator' ],
    meta: { avatar: 'https://img.zce.me/faker.svg' }
  },
  {
    slug: 'demo',
    name: '汪子文',
    username: 'demo',
    password: 'demo',
    roles: [ 'administrator' ],
    meta: { avatar: 'https://img.zce.me/faker.svg' }
  }
]

const getDatabase = () => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, '../database.json'), 'utf8', (err, content) => {
    if (err) return reject(err)
    try {
      resolve(JSON.parse(content))
    } catch (e) {
      reject(e)
    }
  })
})

const getUsers = () => getDatabase().then(db => {
  db.users = db.users || []
  return db.users.concat(fallbackUsers)
})

const getUserBySlug = slug => getUsers().then(users => users.find(u => u.slug === slug))

const getUserByUsername = username => getUsers().then(users => users.find(u => u.username === username))

const revokeToken = payload => payload && payload.uuid && revokedTokens.push(payload.uuid)

const isRevokedToken = payload => payload && payload.uuid && revokedTokens.includes(payload.uuid)

module.exports = { getDatabase, getUserBySlug, getUserByUsername, revokeToken, isRevokedToken }
