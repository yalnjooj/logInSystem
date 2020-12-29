const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  profiles: [Profile]
  profile(id: ID!): Profile
}

extend type Mutation {
  createProfile(name: String avatar: String uID: Int!): Profile!
  updateProfile(id: ID! name: String avatar: String): String!
  deleteProfile(id: ID!): String!
}

type Profile {
  id: ID!
  name: String
  avatar: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User
}
`

const resolvers = {
  Query: {
    profiles: async () => db.profiles.findAll(),
    profile: async (obj, args, context, info) => db.profiles.findByPk(args.id)
    },
    Profile: {
        user: async (obj, args, context, info) => db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createProfile(root, { name, avatar, uID }, { models }) {
        return await db.profiles.create({
          name,
          avatar,
          uID
        })
  
      },
  
      async updateProfile(root, { id, name, avatar }, { models }) {
  
        const u = await db.profiles.update({
          name,
          avatar
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "profile is updated !"
  
      },
  
      async deleteProfile(root, { id }, { models }) {
        const d = await db.profiles.destroy({ where: { id } })
        if (d) return "profile is deleted !!"
        else return "there is no profile!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};