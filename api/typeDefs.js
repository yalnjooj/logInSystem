const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  email: String
  password: String
  isActive: Boolean
  createdAt: Int
  updatedAt: Int
  
  roleId: Int
}

type Subscription {
    dataUpdated: User
}
  type Query {
    currentUser: User
  }

  type AuthPayload {
    user: User
  }

  type Mutation {
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
    currentUser: User

  }
`;
module.exports = typeDefs;