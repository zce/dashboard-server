require('dotenv').config()

module.exports = {
  secret: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  expires: 24 * 60 * 60, // 24h
  // enable delay for testing
  enableDelay: false
}
