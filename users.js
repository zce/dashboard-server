const fs = require('fs')
const path = require('path')
const { Router } = require('express')

const router = new Router()

router.get('/users/me', (req, res) => {
  fs.readFile(path.join(__dirname, 'database.json'), 'utf-8', (err, content) => {
    if (err) return res.send({})
    const { users } = JSON.parse(content)
    const user = users.find(u => u.slug === req.user.slug)
    if (!user) return res.send({})
    res.send(user)
  })
})

module.exports = () => router
