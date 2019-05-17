const os = require('os')
const fs = require('fs')
const path = require('path')

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

const initDatabase = () => {
  // disable cache
  delete require.cache[require.resolve('./faker')]
  const data = require('./faker')
  fs.writeFileSync(dbFilename, JSON.stringify(data))
  return dbFilename
}

const getDatabase = () => new Promise((resolve, reject) => {
  fs.readFile(dbFilename, 'utf8', (err, content) => {
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

const getUserByUsername = username => getUsers().then(users => users.find(u => u.username.toLowerCase() === username.toLowerCase()))

const revokeToken = payload => payload && payload.uuid && revokedTokens.push(payload.uuid)

const isRevokedToken = payload => payload && payload.uuid && revokedTokens.includes(payload.uuid)

module.exports = { initDatabase, getDatabase, getUserBySlug, getUserByUsername, revokeToken, isRevokedToken }
