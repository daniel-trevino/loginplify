import './lib/env'
import {
  ApolloServer,
  mergeSchemas,
  makeExecutableSchema
} from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'
import { PORT } from './utils/constants'
import models from './models/models'
import { createRemoteExecutableSchemas } from './utils/schemaUtils'

const localSchemas = makeExecutableSchema({
  resolvers,
  typeDefs
})

const createNewSchema = async () => {
  const schemas = await createRemoteExecutableSchemas()
  return mergeSchemas({
    schemas,
    ...localSchemas
  })
}

const app = express()

createNewSchema().then(schema => {
  const server = new ApolloServer({
    context: request => ({
      ...request,
      models
    }),
    introspection: true,
    playground: true,
    schema
  })

  server.applyMiddleware({ app })

  console.log(`Graphql server is running on http://localhost:${PORT}/graphql`)
})

app.use(bodyParser.json())

app.get('/', (_: any, res: any) => {
  res.json({ data: `${Date.now()}` })
})

app.post('/data', (req, res) => {
  res.json({
    body: req.body,
    status: 'OK (ts)'
  })
})

app.listen(PORT, () =>
  // tslint:disable-next-line:no-console
  console.log(`Express server is running on http://localhost:${PORT}`)
)

export default app
