const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  SMBSnames: [SMBSname]
  SMBSname(id: ID!): SMBSname
}

extend type Mutation {
  createSMBSname(name: String uID: Int!): SMBSname!
  updateSMBSname(id: ID! name: String!): String!
  deleteSMBSname(id: ID!): String!
}

type SMBSname {
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
    SMBSnames: async () => await db.smbsname.findAll(),
    SMBSname: async (obj, args, context, info) => await db.smbsname.findByPk(args.id)
    },
    SMBSname: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createSMBSname(root, { name, uID }, { models }) {
        return await db.smbsname.create({
          name,
          uID
        })
  
      },
  
      async updateSMBSname(root, { id, name }, { models }) {
  
        const u = await db.smbsname.update({
          name
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "SMBS name is updated !"
  
      },
  
      async deleteSMBSname(root, { id }, { models }) {
         
        const d = await db.smbsname.destroy({ where: { id } })
        if (d) return "SMBS name is deleted !!"
        else return "there is no SMBS name!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};