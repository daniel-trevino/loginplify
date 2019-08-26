import { APP_SECRET } from '../utils/constants'
import { isAlreadyRegistered } from '../utils/authUtils'
import { getDefaultPermissions } from '../utils/dbUtils'
import {
  sendConfirmationEmail,
  sendResetPasswordEmail,
  isStillValidTokenExpiry,
  createRandomToken
} from '../utils/authUtils'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-core')

export const authQueries = {}

export const authMutations = {
  login: async (
    _: any,
    { email, password }: { email: string; password: string },
    ctx: any
  ) => {
    // 1. Check if there is a user with that email
    const user = await ctx.models.User.findOne({ email })

    if (!user) {
      throw new AuthenticationError(`No such user found for email: ${email}`)
    }

    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new AuthenticationError('Invalid password')
    }

    // 3. Generate the JWT Token
    const token = jwt.sign({ userID: user._id }, APP_SECRET)

    // 4. Return the user
    return {
      token,
      user
    }
  },
  requestReset: async (_: any, { email }: { email: string }, ctx: any) => {
    // Check if there is a user with that email
    const user = await ctx.models.User.findOne({ email })

    if (!user) {
      throw new AuthenticationError(`No such user found for email: ${email}`)
    }

    // Set a reset token and expiry on that user
    const resetToken = await createRandomToken()

    // Update user adding the reset token and expiry
    const requestingUser = await ctx.models.User.updateOne(
      {
        _id: user._id
      },
      {
        ...user._doc,
        resetToken: resetToken.randomToken,
        resetTokenExpiry: resetToken.randomTokenExpiry
      },
      { upsert: true }
    )

    if (!requestingUser) {
      throw new AuthenticationError('Something went really wrong')
    }

    // Send reset password email not waiting for it since it might delay the sign up process.
    const host = ctx.req.get('host')
    await sendResetPasswordEmail(host, resetToken.randomToken, email)

    return 'Reset password email sent'
  },
  requestVerify: async (_: any, { email }: { email: string }, ctx: any) => {
    // Check if there is a user with that email
    const user = await ctx.models.User.findOne({ email })

    if (!user) {
      throw new AuthenticationError(`No such user found for email: ${email}`)
    }

    if (user.verified) {
      throw new AuthenticationError('This user has been verified already')
    }

    // Set a reset token and expiry on that user
    const resetToken = await createRandomToken()

    // Update user adding the reset token and expiry
    const requestingUser = await ctx.models.User.updateOne(
      {
        _id: user._id
      },
      {
        ...user._doc,
        verifyToken: resetToken.randomToken,
        verifyTokenExpiry: resetToken.randomTokenExpiry
      },
      { upsert: true }
    )

    if (!requestingUser) {
      throw new AuthenticationError('Something went really wrong')
    }

    // Send reset password email not waiting for it since it might delay the sign up process.
    const host = ctx.req.get('host')
    await sendConfirmationEmail(host, resetToken.randomToken, email)

    return 'Verification email sent'
  },
  resetPassword: async (_: any, args: any, ctx: any) => {
    // Check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Get the user
    const user = await ctx.models.User.findOne({
      resetToken: args.resetToken
    })

    // Check if the token is valid
    const isValidToken =
      (user && isStillValidTokenExpiry(user.resetTokenExpiry)) || null

    if (!user || !isValidToken) {
      throw new AuthenticationError('The token is no longer valid')
    }
    // Hash the new password
    const password = await bcrypt.hash(args.password, 10)

    // Update the user
    await ctx.models.User.updateOne(
      {
        _id: user._id
      },
      {
        ...user._doc,
        password,
        resetToken: null,
        resetTokenExpiry: null
      },
      { upsert: true }
    )

    // Login the user and return
    const authPayload = await authMutations.login(
      _,
      {
        email: user.email,
        password: args.password
      },
      ctx
    )

    return authPayload
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

    // Create a verify token
    const generatedToken = await createRandomToken()

    // Create the user in the DB
    const user = await ctx.models.User.create({
      ...args,
      createdAt: `${Date.now()}`,
      password,
      permissions: [defaultPermission._id],
      verifyToken: generatedToken.randomToken,
      verifyTokenExpiry: generatedToken.randomTokenExpiry
    })

    // Create JWT token
    const token = jwt.sign({ userID: user._id }, APP_SECRET)

    // Send confirmation email, not waiting for it since it might delay the sign up process.
    await authMutations.requestVerify(_, args, ctx)

    // 4. Return the user
    return {
      token,
      user
    }
  },
  verify: async (_: any, args: any, ctx: any) => {
    // Get the token
    const verifyToken = args.token
    // Get the user
    const user = await ctx.models.User.findOne({
      verifyToken
    })
    // Check if the token is still valid
    const isValidToken =
      (user && isStillValidTokenExpiry(user.verifyTokenExpiry)) || null

    if (!user || !isValidToken) {
      throw new AuthenticationError('The token is no longer valid')
    }

    // Remove the verify token and verify the user
    const verifiedUser = await ctx.models.User.updateOne(
      {
        _id: user._id
      },
      {
        ...user._doc,
        verified: true,
        verifyToken: null,
        verifyTokenExpiry: null
      },
      { upsert: true }
    )

    if (!verifiedUser) {
      throw new AuthenticationError('Something went really wrong')
    }

    return 'Verified'
  }
}
