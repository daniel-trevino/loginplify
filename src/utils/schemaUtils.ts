import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { GRAPHQL_APIS } from './constants'

export const createRemoteExecutableSchemas = async () => {
  let schemas = []
  for (const api of GRAPHQL_APIS) {
    const link = new HttpLink({
      uri: api.uri,
      fetch
    })
    const remoteSchema = await introspectSchema(link)
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    })
    schemas.push(remoteExecutableSchema)
  }
  return schemas
}
