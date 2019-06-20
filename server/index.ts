import './lib/env'
import { ApolloServer } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import typeDefs from './schema/schema'
import resolvers from './resolvers/resolvers'
import { PORT } from './utils/constants'
import models from './models/models'
import { createEngine } from 'express-react-views'

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
// Render react from SSR - Account verified view
app.set('views', __dirname + '/views')
app.set('view engine', 'js')
app.engine('js', createEngine())

app.use(bodyParser.json())

app.get('/status', (_: any, res: any) => {
  res.json({ data: `${Date.now()}` })
})

app.get('/verify/:id', (_req: any, res: any) => {
  res.render('AccountVerified', { msg: 'Verified!' })
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
