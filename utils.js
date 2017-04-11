// const fs = require('fs')
const config = require('./config')

module.exports = {
  getUsers (callback) {
    // fs.readFile(path.join(__dirname, 'database.json'), 'utf-8', (err, content) => {
    //   if (err) return callback(e)
    //   try {
    //     callback(null, JSON.parse(content).users)
    //   } catch (e) {
    //     callback(e)
    //   }
    // })

    // Fake users
    setTimeout(() => {
      callback(null, config.users)
    }, 100)
  }
}
