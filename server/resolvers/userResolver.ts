import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import User from '../models/userModel'
import mongoose from '../lib/database'
import { APP_SECRET } from '../utils/constants'
import { getUserID, isAlreadyRegistered } from '../utils/userUtils'
import { getDefaultPermissions } from '../utils/dbUtils'
import { sendConfirmationEmail } from '../utils/authUtils'

// Provide resolver functions for your schema fields
const userResolver = {
  Mutation: {
    login: async (
      _: any,
      { email, password }: { email: string; password: string },
      ctx: any
    ) => {
      // 1. Check if there is a user with that email
      const user = await ctx.models.User.findOne({ email })

      if (!user) {
        throw new Error(`No such user found for email: ${email}`)
      }

      // 2. Check if their passord is correct
      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }

      // 3. Generate the JWT Token
      const token = jwt.sign({ userID: user._id }, APP_SECRET)

      // 4. Return the user
      return {
        token,
        user
      }
    },
    signUp: async (_: any, args: any, ctx: any) => {
      // Lowercase their email
      const email = args.email.toLowerCase()
      args.email = email
      // Checks if user has been registered already
      const defaultPermission = await getDefaultPermissions(ctx)
      await isAlreadyRegistered(ctx, email)
      // Hash their password
      const password = await bcrypt.hash(args.password, 10)

      // Create the user in the DB
      const user = await ctx.models.User.create({
        ...args,
        createdAt: `${Date.now()}`,
        password,
        permissions: [defaultPermission._id]
      })

      // Create JWT token
      const token = jwt.sign({ userID: user._id }, APP_SECRET)

      // Send confirmation email, not waiting for it since it might delay the sign up process.
      const host = ctx.req.get('host')
      sendConfirmationEmail(host, user._id, email)

      // 4. Return the user
      return {
        token,
        user
      }
    }
  },
  Query: {
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
}

export default userResolver
