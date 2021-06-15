const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    getContinentInformation(continent: String!): Continent
  }

  type Continent {
    continent: String!
    cases: Int!
    todayCases: String!
    deaths: String!
    todayDeaths: String!
    updated: String!
  }
`

module.exports = typeDefs
