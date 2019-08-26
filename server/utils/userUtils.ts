import { APP_SECRET } from './constants'
const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server-core')

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
