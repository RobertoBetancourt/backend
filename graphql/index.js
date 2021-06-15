const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const CovidAPI = require('./covidAPI')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

async function startApolloServer () {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      covidAPI: new CovidAPI()
    })
  })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })

  await new Promise(resolve => app.listen({ port: 4000 }, resolve))
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

startApolloServer()
