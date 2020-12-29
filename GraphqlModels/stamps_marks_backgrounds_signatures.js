const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  SMBSs: [SMBS]
  SMBS(id: ID!): SMBS
}

extend type Mutation {
  createSMBS(uri: String uID: Int! smbs_name_ID: Int!): SMBS!
  updateSMBS(id: ID! uri: String smbs_name_ID: Int): String!
  deleteSMBS(id: ID!): String!
}

type SMBS {
  id: ID!
  uri: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  smbs_name_ID: Int
  SMBSname: SMBSname
}
`

const resolvers = {
  Query: {
    SMBSs: async () => await db.stampsmarksbackgroundssignatures.findAll(),
    SMBS: async (obj, args, context, info) => await db.stampsmarksbackgroundssignatures.findByPk(args.id)
    },
    SMBS: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        SMBSname: async (obj, args, context, info) => await db.smbsname.findByPk(obj.smbs_name_ID)
    },
    Mutation: {
      async createSMBS(root, { uri, uID, smbs_name_ID }, { models }) {
        return await db.stampsmarksbackgroundssignatures.create({
          uri,
          uID,
          smbs_name_ID
        })
  
      },
  
      async updateSMBS(root, { id, uri, smbs_name_ID }, { models }) {
  
        const u = await db.stampsmarksbackgroundssignatures.update({
          uri,
          smbs_name_ID
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "SMBS is updated !"
  
      },
  
      async deleteSMBS(root, { id }, { models }) {
         
        const d = await db.stampsmarksbackgroundssignatures.destroy({ where: { id } })
        if (d) return "SMBS is deleted !!"
        else return "there is no SMBS!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};