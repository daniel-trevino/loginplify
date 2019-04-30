import jwt from 'jsonwebtoken'
import { combineResolvers } from 'graphql-resolvers'
import { AuthenticationError, UserInputError } from 'apollo-server'

import { isAdmin, isAuthenticated } from './authorizationResolver'

const createToken = async (user: any, secret: string, expiresIn: any) => {
  const { id, email, username, role } = user
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn
  })
}

export default {
  Query: {
    users: async (_parent: any, _args: any, { models }: any) => {
      return await models.User.find()
    },
    user: async (_parent: any, { id }: any, { models }: any) => {
      return await models.User.findById(id)
    },
    me: async (_parent: any, _args: any, { models, me }: any) => {
      if (!me) {
        return null
      }

      return await models.User.findById(me.id)
    }
  },

  Mutation: {
    signUp: async (
      _parent: any,
      { username, email, password }: any,
      { models, secret }: any
    ) => {
      const user = await models.User.create({
        username,
        email,
        password
      })

      return { token: createToken(user, secret, '30m') }
    },

    signIn: async (
      _parent: any,
      { login, password }: any,
      { models, secret }: any
    ) => {
      const user = await models.User.findByLogin(login)

      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)

      if (!isValid) {
        throw new AuthenticationError('Invalid password.')
      }

      return { token: createToken(user, secret, '30m') }
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (_parent, { username }, { models, me }) => {
        return await models.User.findByIdAndUpdate(
          me.id,
          { username },
          { new: true }
        )
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (_parent, { id }, { models }) => {
        const user = await models.User.findById(id)

        if (user) {
          await user.remove()
          return true
        } else {
          return false
        }
      }
    )
  }
}
