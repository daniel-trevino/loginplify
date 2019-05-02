import './lib/env'
import { ApolloServer, gql } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import mongoose from './lib/database'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  userName: String
})

const User = mongoose.model('user', userSchema)

const typeDefs = gql`
  type User {
    email: String
    id: ID!
    userName: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    addUser(userName: String!, email: String!): User
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Mutation: {
    addUser: async (_: any, args: any) => {
      try {
        const response = await User.create(args)
        return response
      } catch (e) {
        return e.message
      }
    }
  },
  Query: {
    getUsers: async () => await User.find({}).exec()
  }
}

const server = new ApolloServer({
  introspection: true,
  playground: true,
  resolvers,
  typeDefs
})

const { PORT = 3000 } = process.env

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

app.listen(PORT, () =>
  // tslint:disable-next-line:no-console
  console.log(`Graphql server is running on http://localhost:${PORT}/graphql`)
)

export default app
