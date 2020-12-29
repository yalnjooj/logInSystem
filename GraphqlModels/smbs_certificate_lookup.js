const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const typeDefs = gql`

extend type Query {
  SMBScerLookups: [SMBScerLookup]
  SMBScerLookup(uID: Int! certificate_ID: Int!): [SMBScerLookup]
}

extend type Mutation {
  createSMBScerLookup(uID: Int! SMBS_ID: Int! certificate_ID: Int!): SMBScerLookup!
  updateSMBScerLookup(id: ID! SMBS_ID: Int certificate_ID: Int): String!
  deleteSMBScerLookup(id: ID!): String!
}

type SMBScerLookup {
  id: ID!
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  SMBS_ID: Int
  SMBS: SMBS

  certificate_ID: Int
  certificate: Certificate
}
`

const resolvers = {
  Query: {
    SMBScerLookups: async () => await db.smbscertificatelookup.findAll(),
    SMBScerLookup: async (obj, args, context, info) => await db.smbscertificatelookup.findAll({where: {[Op.and]: [{uID: args.uID, certificate_ID: args.certificate_ID}]}})
    },
    SMBScerLookup: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        SMBS: async (obj, args, context, info) => await db.stampsmarksbackgroundssignatures.findByPk(obj.SMBS_ID),
        certificate: async (obj, args, context, info) => await db.certificates.findByPk(obj.certificate_ID)
    },
    Mutation: {
      async createSMBScerLookup(root, { uID, SMBS_ID, certificate_ID }, { models }) {
        return await db.smbscertificatelookup.create({
          uID,
          SMBS_ID,
          certificate_ID
        })
  
      },
  
      async updateSMBScerLookup(root, { id, SMBS_ID, certificate_ID }, { models }) {
  
        const u = await db.smbscertificatelookup.update({
          SMBS_ID,
          certificate_ID
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "SMBScerLookup is updated !"
  
      },
  
      async deleteSMBScerLookup(root, { id }, { models }) {
         
        const d = await db.smbscertificatelookup.destroy({ where: { id } })
        if (d) return "SMBScerLookup is deleted !!"
        else return "there is no SMBScerLookup!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};