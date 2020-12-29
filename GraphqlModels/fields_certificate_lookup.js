const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const typeDefs = gql`

extend type Query {
  FieldsCertificateLookups: [FieldsCertificateLookup]
  FieldsCertificateLookup(uID: Int): FieldsCertificateLookup
  UserFieldsCertificate(uID: Int! certificate_ID: Int!): [FieldsCertificateLookup]
}

extend type Mutation {
  createFieldsCertificateLookup(uID: Int! fieldID: Int! certificate_ID: Int!): FieldsCertificateLookup!
  updateFieldsCertificateLookup(id: ID! fieldID: Int certificate_ID: Int): String!
  deleteFieldsCertificateLookup(id: ID!): String!
}

type FieldsCertificateLookup {
  id: ID!
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  fieldID: Int
  certificateFieldsTag: CertificateFieldsTag

  certificate_ID: Int
  certificate: Certificate
}
`

const resolvers = {
  Query: {
    FieldsCertificateLookups: async () => await db.fieldscertificatelookup.findAll(),
    FieldsCertificateLookup: async (obj, args, context, info) => await db.fieldscertificatelookup.findByPk(args.id),
    UserFieldsCertificate: async (obj, args, context, info) => await db.fieldscertificatelookup.findAll({where: {[Op.and]: [{uID: args.uID, certificate_ID: args.certificate_ID}]}}) 
    },
    FieldsCertificateLookup: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        certificateFieldsTag: async (obj, args, context, info) => await db.certificatefieldstags.findByPk(obj.fieldID),
        certificate: async (obj, args, context, info) => await db.certificates.findByPk(obj.certificate_ID)
    },
    Mutation: {
      async createFieldsCertificateLookup(root, { uID, fieldID, certificate_ID }, { models }) {
        return await db.fieldscertificatelookup.create({
          uID,
          fieldID,
          certificate_ID
        })
  
      },
  
      async updateFieldsCertificateLookup(root, { id, fieldID, certificate_ID }, { models }) {
  
        const u = await db.fieldscertificatelookup.update({
          fieldID,
          certificate_ID
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Fields Certificate Lookups is updated !"
  
      },
  
      async deleteFieldsCertificateLookup(root, { id }, { models }) {
         
        const d = await db.fieldscertificatelookup.destroy({ where: { id } })
        if (d) return "Fields Certificate Lookups is deleted !!"
        else return "there is no Fields Certificate Lookups!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};