const { Router } = require('express')
const utils = require('./utils')

const router = new Router()

router.get('/users/me', (req, res) => {
  utils.getUsers((err, users) => {
    if (err) return res.send({})
    const user = users.find(u => u.slug === req.user.slug)
    if (!user) return res.send({})
    res.send(user)
  })
})

module.exports = () => router
