import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { GRAPHQL_APIS } from './constants'

export const createRemoteExecutableSchemas = async () => {
  const schemas = []
  for (const api of GRAPHQL_APIS) {
    const link = new HttpLink({
      fetch,
      uri: api.uri
    })
    const remoteSchema = await introspectSchema(link)
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      link,
      schema: remoteSchema
    })
    schemas.push(remoteExecutableSchema)
  }
  return schemas
}
