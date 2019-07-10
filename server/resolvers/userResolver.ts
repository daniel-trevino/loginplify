import mongoose from '../lib/database'
import { getUserID } from '../utils/userUtils'
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

    const ObjectId = mongoose.Types.ObjectId

    const [user] = await ctx.models.User.aggregate([
      { $match: { _id: new ObjectId(_id) } },
      {
        $lookup: {
          as: 'permissions', // Alias
          foreignField: '_id', // Field in the 'permission' schema
          from: 'permissions', // collection name in db
          localField: 'permissions' // Field in the user schema
        }
      }
    ])

    return user
  }
}

export const userMutations = {}
