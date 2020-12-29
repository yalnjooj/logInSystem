const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  LangSexs: [LangSex]
  LangSex(id: ID!): LangSex
}

extend type Mutation {
  createLangSex(type: String uID: Int!): LangSex!
  updateLangSex(id: ID! type: String!): String!
  deleteLangSex(id: ID!): String!
}

type LangSex {
  id: ID!
  type: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User
}
`

const resolvers = {
  Query: {
    LangSexs: async () => await db.langsex.findAll(),
    LangSex: async (obj, args, context, info) => await db.langsex.findByPk(args.id)
    },
    LangSex: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createLangSex(root, { type, uID }, { models }) {
        return await db.langsex.create({
          type,
          uID
        })
  
      },
  
      async updateLangSex(root, { id, type }, { models }) {
  
        const u = await db.langsex.update({
          type
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "langsex is updated !"
  
      },
  
      async deleteLangSex(root, { id }, { models }) {
         
        const d = await db.langsex.destroy({ where: { id } })
        if (d) return "langsex is deleted !!"
        else return "there is no langsex!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};