const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.KEY)
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.KEY)
}

module.exports = { generateToken, verifyToken }
