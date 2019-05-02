import { gql } from 'apollo-server-express'

export default gql`
  type User {
    email: String
    id: ID!
    userName: String
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    addUser(userName: String!, email: String!): User
  }
`
