import * as jwt from 'jsonwebtoken'
import { APP_SECRET } from './constants'
import { AuthenticationError } from 'apollo-server-core'

export function getUserID(ctx: any) {
  const Authorization = ctx.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userID } = jwt.verify(token, APP_SECRET) as {
      userID: string
    }

    return userID
  }

  throw new AuthenticationError('Your session expired. Sign in again.')
}

export async function isAlreadyRegistered(ctx: any, email: string) {
  try {
    const user = await ctx.models.User.findOne({ email: email })
    if (user) {
      throw new AuthenticationError('User already registered')
    }

    return true
  } catch (e) {
    throw new Error(e)
  }
}
