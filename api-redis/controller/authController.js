const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.postLogin = (req, res, next) => {
  let usuario
  prisma.user
    .findMany({ where: { mail: req.body.mail } })
    .then((result) => {
      if (result.length == 0) {
        const error = new Error('Usuario no encontrado')
        error.statusCode = 401
        throw error
      }
      usuario = result[0]
      return bcrypt.compare(req.body.password, usuario.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Contrasenia erronea')
        error.statusCode = 401
        throw error
      }
      const token = jwt.sign(
        {
          email: req.body.mail,
          userId: usuario.id
        },
        'vaccines',
        { expiresIn: '1h' }
      )
      res.status(200).json({ token: token, userId: usuario.id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.postRegister = (req, res, next) => {
  console.log(req.body.mail)
  prisma.user
    .findMany({ where: { mail: req.body.mail } })
    .then((result) => {
      console.log(result)
      if (result.length == 0) {
        bcrypt.hash(req.body.password, 12, (error, hash) => {
          prisma.user
            .create({
              data: {
                name: req.body.name,
                mail: req.body.mail,
                password: hash
              }
            })
            .then((result) => {
              console.log(result)
              res.status(201).json({
                message: 'User Registered Succesfully',
                user: result
              })
            })
            .catch((err) => console.log(err))
        })
      } else {
        console.log('Username invalid')
        res.status(401).json({
          message: 'Unauthorized'
        })
      }
    })
    .catch((err) => console.log(err))
}
