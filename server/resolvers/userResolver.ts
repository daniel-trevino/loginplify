import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { APP_SECRET } from '../utils/constants'
import { getUserID } from '../utils/userUtils'

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
      args.email = args.email.toLowerCase()
      // Hash their password
      const password = await bcrypt.hash(args.password, 10)
      // Create the user in the DB
      const user = await ctx.models.User.create({
        ...args,
        createdAt: `${Date.now()}`,
        password
      })

      // Create JWT token
      const token = jwt.sign({ userID: user._id }, APP_SECRET)

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

      return ctx.models.User.findOne({ _id })
    }
  }
}

export default userResolver
