import User from '../models/userModel'
import mongoose from '../lib/database'
import { getUserID } from '../utils/userUtils'

export const userQueries = {
  getUsers: async () => await User.find({}).exec(),
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
