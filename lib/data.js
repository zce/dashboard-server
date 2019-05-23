const os = require('os')
const fs = require('fs')
const path = require('path')

const faker = require('./faker')

// TODO: Revoked tokens store
const revokedTokens = []

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
  return db.users.concat(faker.fallbackUsers)
}

const getUserBySlug = slug => {
  const users = getUsers()
  return users.find(u => u.slug === slug)
}

const getUserByUsername = username => {
  const users = getUsers()
  return users.find(u => u.username.toLowerCase() === username.toLowerCase())
}

const revokeToken = payload => {
  payload && payload.uuid && revokedTokens.push(payload.uuid)
}

const isRevokedToken = payload => {
  payload && payload.uuid && revokedTokens.includes(payload.uuid)
}

module.exports = { init, getDatabase, getUserBySlug, getUserByUsername, revokeToken, isRevokedToken }
