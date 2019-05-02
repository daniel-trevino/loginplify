import { gql } from 'apollo-server-express'
import userSchema from './userSchema'

const linkSchema = gql`
  scalar Date

  type Subscription {
    _: Boolean
  }
`

export default [linkSchema, userSchema]
