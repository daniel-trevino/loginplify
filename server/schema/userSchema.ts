import { gql } from 'apollo-server-express'

export default gql`
  type Permission {
    _id: ID!
    enum: String!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  type User {
    _id: ID!
    name: String
    email: String!
    createdAt: Date!
    verified: Boolean
    resetToken: String
    verifyToken: String
    permissions: [Permission]
  }
  type Query {
    getUsers: [User]
    me: User!
  }
  type Mutation {
    signUp(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    verify(token: String!): String!
    requestVerify(email: String!): String!
    requestReset(email: String!): String!
    resetPassword(
      resetToken: String!
      password: String!
      confirmPassword: String!
    ): AuthPayload!
  }
`
