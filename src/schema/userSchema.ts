import { gql } from 'apollo-server-express'

export default gql`
  type AuthPayload {
    token: String!
    user: User!
  }
  type User {
    createdAt: Date!
    email: String
    id: ID!
    name: String
    password: String!
    resetToken: String
    resetTokenExpiry: Float
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`
