const resolvers = {
  Query: {
    getContinentInformation: async (_source, { continent }, { dataSources }) =>
      dataSources.covidAPI.getContinent(continent)
  }
}

module.exports = resolvers
