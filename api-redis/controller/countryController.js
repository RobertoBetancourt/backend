const { PrismaClient } = require('@prisma/client')
const { default: axios } = require('axios')
const { client } = require('../helper/redis')
const prisma = new PrismaClient()
const redisClient = require('../helper/redis')

exports.getCountries = (req, res, next) => {
  prisma.country
    .findMany()
    .then((result) => {
      console.log(result)
      redisClient.setex('activeCountries', 2000, JSON.stringify(result))
      res.status(200).send({
        error: false,
        message: 'Fetched from redis',
        data: result
      })
    })
    .catch((err) => {
      res.status(500).json({ message: 'Unknown Server Error' })
    })
}

exports.getAllCountries = (req, res, next) => {
  try {
    redisClient.get('countries', async (err, result) => {
      if (result) {
        console.log('ya esta en redis')
        return res.status(200).send({
          error: false,
          message: 'Fetched Countries',
          data: JSON.parse(result)
        })
      } else {
        const countries = await axios.get(
          'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json'
        )
        console.log('Insertando en redis')

        redisClient.setex('countries', 86400, JSON.stringify(countries.data))

        return res.status(200).send({
          error: false,
          message: 'Fetched from redis',
          data: countries.data
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

exports.postCountry = (req, res, next) => {
  let country
  prisma.country
    .findUnique({ where: { id: parseInt(req.params.id) } })
    .then((result) => {
      country = result
      return prisma.country.update({
        where: { id: parseInt(result.id) },
        data: { active: req.body.active }
      })
    })
    .then((result) => {
      console.log(result)
      res
        .status(201)
        .json({ message: 'Pais modificado exitosamente', updated: result })
    })
    .catch((err) => {
      console.log(err)
    })
}
