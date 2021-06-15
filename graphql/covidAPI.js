const { RESTDataSource } = require('apollo-datasource-rest')

class CovidAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'https://corona.lmao.ninja/v3/covid-19/'
  }

  async getContinent (continent) {
    return this.get(`continents/${continent}`)
  }
}

module.exports = CovidAPI
