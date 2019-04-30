import { gql } from 'apollo-server-express'

import userSchema from './userSchema'
const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
    hello: String
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [linkSchema, userSchema]
