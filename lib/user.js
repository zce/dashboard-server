const data = require('./data')

const me = (req, res) => {
  const user = data.getUserBySlug(req.user.slug)
  if (!user) return res.status(404).send({})
  const result = Object.assign({}, user)
  // TODO: delete sensitive prop
  delete result.password
  res.send(result)
}

module.exports = { me }
