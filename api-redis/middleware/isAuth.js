const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log('=============================================')
  console.log(req.body)
  const token = req.body.token
  try {
    const decoded = jwt.verify(token, 'vaccines')
    req.userData = decoded
  } catch (error) {
    return res.status(401).json({ message: 'Auth Failed' })
  }
  next()
}
