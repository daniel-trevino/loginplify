import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import User from '../models/userModel'
import { APP_SECRET } from '../utils/constants'

// Provide resolver functions for your schema fields
const userResolver = {
  Mutation: {
    signup: async (_parent: any, args: any, ctx: any) => {
      // Lowercase their email
      args.email = args.email.toLowerCase()
      // Hash their password
      const password = await bcrypt.hash(args.password, 10)
      // Create the user in the DB
      const user = await ctx.models.User.create({
        ...args,
        password,
        createdAt: `${Date.now()}`
      })

      // Create JWT token
      const token = jwt.sign({ userID: user._id }, APP_SECRET)

      // 4. Return the user
      return {
        token,
        user
      }
    },
    login: async (
      _parent: any,
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
    }
  },
  Query: {
    getUsers: async () => await User.find({}).exec()
  }
}

export default userResolver
