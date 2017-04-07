const { Router } = require('express')

let enabled = false

const router = new Router()

router.get('/toggle-delay', (req, res) => {
  enabled = !enabled
  res.send(enabled)
})

module.exports = () => [
  router,
  (req, res, next) => {
    if (!enabled) return next()

    if (req.method === 'OPTIONS') {
      // ignore options request
      return next()
    }
    setTimeout(next, Math.random() * 500)
  }
]
