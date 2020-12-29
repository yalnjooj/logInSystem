const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  coaches: [Coache]
  coache(id: ID!): Coache
}

extend type Mutation {
  createCoache(name: String! catagoryId: Int! email: String! phone: Int! uID: Int!): Coache!
  updateCoache(id: ID! name: String catagoryId: Int email: String phone: Int): String!
  deleteCoache(id: ID!): String!
}

type Coache {
  id: ID!
  name: String
  email: String
  phone: Int
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  catagoryId: Int
  catagory: Catagory
}
`

const resolvers = {
  Query: {
    coaches: async () => await db.coaches.findAll(),
    coache: async (obj, args, context, info) => await db.coaches.findByPk(args.id)
    },
    Coache: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        catagory: async (obj, args, context, info) => await db.catagory.findByPk(obj.catagoryId)
    },
    Mutation: {
      async createCoache(root, { name, catagoryId, email, phone, uID }, { models }) {
        return await db.coaches.create({
          name,
          catagoryId,
          email,
          phone,
          uID
        })
  
      },
  
      async updateCoache(root, { id, catagoryId, name, email, phone }, { models }) {
  
        const u = await db.coaches.update({
          name,
          catagoryId,
          email,
          phone,
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Coache is updated !"
  
      },
  
      async deleteCoache(root, { id }, { models }) {
         
        const d = await db.coaches.destroy({ where: { id } })
        if (d) return "Coache is deleted !!"
        else return "there is no Coache!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};
