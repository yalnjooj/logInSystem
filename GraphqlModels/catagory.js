const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  catagories: [Catagory]
  catagory(id: ID!): Catagory
}

extend type Mutation {
  createCatagory(name: String uID: Int!): Catagory!
  updateCatagory(id: ID! name: String!): String!
  deleteCatagory(id: ID!): String!
}

type Catagory {
  id: ID!
  name: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User
}
`

const resolvers = {
  Query: {
    catagories: async () => await db.catagory.findAll(),
    catagory: async (obj, args, context, info) => await db.catagory.findByPk(args.id)
    },
    Catagory: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createCatagory(root, { name, uID }, { models }) {
        return await db.catagory.create({
          name,
          uID
        })
  
      },
  
      async updateCatagory(root, { id, name }, { models }) {
  
        const u = await db.catagory.update({
          name
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "catagory name is updated !"
  
      },
  
      async deleteCatagory(root, { id }, { models }) {
         
        const d = await db.catagory.destroy({ where: { id } })
        if (d) return "catagory name is deleted !!"
        else return "there is no catagory name!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};