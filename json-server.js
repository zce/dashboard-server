const path = require('path')
const { router } = require('json-server')

module.exports = () => router(path.join(__dirname, 'database.json'))
