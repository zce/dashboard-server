const data = require('./data')

const me = (req, res) => {
  data.getUserBySlug(req.user.slug).then(user => {
    if (!user) return res.send({})
    // TODO: delete sensitive prop
    delete user.password
    res.send(user)
  })
}

module.exports = { me }
