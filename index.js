const server = require('./lib')

server().then(app => {
  app.listen(3000, () => {
    console.log('JSON Server is running: http://localhost:3000')
  })
})
