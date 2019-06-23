import { userQueries, userMutations } from './userResolver'
import { authQueries, authMutations } from './authResolver'

const mergeResolvers = {
  Mutation: {
    ...userMutations,
    ...authMutations
  },
  Query: {
    ...userQueries,
    ...authQueries
  }
}

export default mergeResolvers
