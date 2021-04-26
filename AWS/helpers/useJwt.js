const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  return jwt.sign(payload, 'guyubRUKUN')
}

const verifyToken = (token) => {
  return jwt.verify(token, 'guyubRUKUN')
}

module.exports = { generateToken, verifyToken }
