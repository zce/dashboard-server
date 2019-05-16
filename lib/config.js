require('dotenv').config()

module.exports = {
  secret: process.env.SECRET,
  issuer: process.env.ISSUER,
  audience: process.env.AUDIENCE,
  expires: 24 * 60 * 60, // 24h
  // enable delay for testing
  enableDelay: false
}
