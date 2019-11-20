// DEPENDENCIES
const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

// MODEL IMPORTING
const User = require('../models/user-model').model

// KEYS
const privateKEY = fs.readFileSync(path.join('.', 'api', 'keys', 'private.key'), 'utf8')
const publicKEY = fs.readFileSync(path.join('.', 'api', 'keys', 'public.key'), 'utf8')

// TARGET OPTIONS
const issuer = 'ToroQuotes'
const audience = 'toroquotes.com'
const expiresIn = '24h'
const algorithm = 'RS256'

// SIGN IN
const signin = async (request, response) => {
  try {
    const dbUser = await User.findOne({ username: request.body.username.toLowerCase() })

    if (!dbUser) {
      response.status(404).json({ error: true, message: 'User not found on database' })
    }

    bcrypt.compare(request.body.password, dbUser.password, (error, result) => {
      if (error) {
        return response.status(401).json({ message: 'Auth Failed!' })
      }
      if (result) {
        const options = {
          issuer,
          subject: request.body.username,
          audience,
          expiresIn,
          algorithm
        }

        const payload = { userId: dbUser._id }

        const token = jwt.sign(payload, privateKEY, options)
        response.status(201).json(token)
      }
    })
  } catch (error) {
    response.status(500).json({ error })
  }
}

// VERIFY
const verify = async (request, response) => {
  try {
    const token = request.body.token

    const options = {
      issuer,
      audience,
      expiresIn,
      algorithm: [algorithm]
    }

    const legitToken = jwt.verify(token, publicKEY, options)

    response.status(200).json({ token: legitToken })
  } catch (error) {
    response.status(500).json({ error: true, message: 'Could not verify token' })
  }
}

module.exports = {
  signin,
  verify
}
