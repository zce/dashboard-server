const low = require('lowdb')
const GCouldAdapter = require('./gcloud')
const config = require('./config')
const faker = require('./faker')

const adapter = new GCouldAdapter('dashboard-db.json', {
  defaultValue: faker(),
  projectId: 'zce-me',
  bucketName: 'dashboard-server',
  credentials: config.credentials
})

module.exports = () => low(adapter).then(db => {
  db.getUserBySlug = slug => {
    const user = db.get('users').find({ slug })
    if (user) return user
    return faker.fallbackUsers.find(u => u.slug === slug)
  }

  db.getUserByUsername = username => {
    const user = db.get('users').find({ username })
    if (user) return user
    return faker.fallbackUsers.find(u => u.username === username)
  }

  db.revokeToken = payload => {
    if (!(payload && payload.uuid)) return
    db.get('revokes').push({ uuid: payload.uuid }).write()
  }

  db.isRevokedToken = payload => {
    if (!(payload && payload.uuid)) return true
    return !!db.get('revokes').find({ uuid: payload.uuid })
  }

  db.reset = () => {
    db.setState(faker())
    return db.write()
  }

  return db
})
