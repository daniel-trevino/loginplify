import { ApolloServer, gql } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world (ts)!'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
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

// tslint:disable-next-line:no-console
app.listen(PORT, () => console.log(`__RUNNING__ @ ${PORT}`))

export default app
