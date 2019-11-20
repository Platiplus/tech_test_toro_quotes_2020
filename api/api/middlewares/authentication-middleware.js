const axios = require('axios')

module.exports = async (request, response, next) => {
  const token = request.headers.authorization.split(' ')[1]
  const authentication = await axios.post(`${process.env.AUTH_URL}/auth/verify`, { token })

  if (authentication.status === 200) {
    next()
  } else {
    return response.status(401).json({ error: true, message: 'Unauthorized ' })
  }
}