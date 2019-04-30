import './lib/env'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import DataLoader from 'dataloader'
import resolvers from './resolvers/resolvers'
import models from './models/models'
import typeDefs from './schema/schema'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import loaders from './loaders/loaders'
import { SECRET, PORT } from './utils/constants'

const getMe = async (req: any) => {
  const token = req.headers['x-token']

  if (token) {
    try {
      return await jwt.verify(token, SECRET)
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.')
    }
  }

  return
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },
  context: async ({ req, connection }: any) => {
    if (connection) {
      return {
        models,
        loaders: {
          user: new DataLoader((keys: Array<string>) =>
            loaders.user.batchUsers(keys, models)
          )
        }
      }
    }

    if (req) {
      const me = await getMe(req)

      return {
        models,
        me,
        secret: SECRET,
        loaders: {
          user: new DataLoader((keys: Array<string>) =>
            loaders.user.batchUsers(keys, models)
          )
        }
      }
    }

    return
  }
})

const app = express()

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

server.applyMiddleware({ app })

// tslint:disable-next-line:no-console
app.listen(PORT, () =>
  console.log(`Graphql server is running on http://localhost:${PORT}/graphql`)
)

export default app
