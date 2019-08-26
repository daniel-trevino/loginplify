import { getUserID, getUserFromId } from '../utils/userUtils'
import { verifyAdmin } from '../utils/authUtils'
import { AuthenticationError } from 'apollo-server-core'

export const userQueries = {
  getUsers: async (_: any, _args: any, ctx: any) => {
    const user = await userQueries.me(_, _args, ctx)

    const isAdmin = verifyAdmin(user.permissions)

    if (!isAdmin) {
      throw new AuthenticationError('You dont have permissions for that')
    }

    const users = await ctx.models.User.find({}).exec()
    return users
  },
  me: async (_: any, _args: any, ctx: any) => {
    const _id = getUserID(ctx)

    return getUserFromId(ctx, _id)
  }
}

export const userMutations = {}
