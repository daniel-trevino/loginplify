import { gql } from 'apollo-server-express'

export default gql`
  type Permission {
    id: ID!
    enum: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type User {
    id: ID!
    name: String
    email: String!
    password: String!
    createdAt: Date!
    verified: Boolean
    resetToken: String
    resetTokenExpiry: Float
    permissions: [Permission]
  }
  type Query {
    getUsers: [User]
    me: User!
  }
  type Mutation {
    signUp(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`
