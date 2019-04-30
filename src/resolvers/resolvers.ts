import { GraphQLDateTime } from 'graphql-iso-date'

import userResolvers from './userResolver'

const customScalarResolver = {
  Date: GraphQLDateTime
}

export default { ...customScalarResolver, ...userResolvers }
