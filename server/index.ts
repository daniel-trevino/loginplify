import './lib/env'
import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'
import { PORT } from './utils/constants'
import models from './models/models'
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const server = new ApolloServer({
  context: request => ({
    ...request,
    models
  }),
  introspection: true,
  playground: true,
  resolvers,
  typeDefs
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/status', (_: any, res: any) => {
  res.json({ data: `${Date.now()}` })
})

app.post('/data', (req, res) => {
  res.json({
    body: req.body,
    status: 'OK (ts)'
  })
})

server.applyMiddleware({ app })

app.listen(PORT, () =>
  // tslint:disable-next-line:no-console
  console.log(`Graphql server is running on http://localhost:${PORT}/graphql`)
)

export default app
