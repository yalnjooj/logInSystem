const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const typeDefs = gql`

extend type Query {
  certificates: [Certificate]
  certificate(uID: ID!): [Certificate]
}

extend type Mutation {
  createCertificate(cer_position: String texts_position: String uID: Int! certificate_name_ID: Int! lang_sex_ID: Int!): Certificate!
  updateCertificate(id: ID! cer_position: String texts_position: String certificate_name_ID: Int lang_sex_ID: Int): String!
  deleteCertificate(id: ID!): String!
}

type Certificate {
  id: ID!
  cer_position: String
  texts_position: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  certificate_name_ID: Int
  certificateName: CertificateName

  lang_sex_ID: Int
  langSex: LangSex
}
`

const resolvers = {
  Query: {
    certificates: async () => await db.certificates.findAll(),
    certificate: async (obj, args, context, info) => await db.certificates.findAll({where: {uID: args.uID}})
    },
    Certificate: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        certificateName: async (obj, args, context, info) => await db.certificatename.findByPk(obj.certificate_name_ID),
        langSex: async (obj, args, context, info) => await db.langsex.findByPk(obj.lang_sex_ID),
    },
    Mutation: {
      async createCertificate(root, { cer_position, texts_position, uID, certificate_name_ID, lang_sex_ID }, { models }) {
        return await db.certificates.create({
          cer_position,
          texts_position,
          uID,
          certificate_name_ID,
          lang_sex_ID
        })
  
      },
  
      async updateCertificate(root, { id, cer_position, texts_position, certificate_name_ID, lang_sex_ID }, { models }) {
  
        const u = await db.certificates.update({
          cer_position,
          texts_position,
          certificate_name_ID,
          lang_sex_ID
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "certificate is updated !"
  
      },
  
      async deleteCertificate(root, { id }, { models }) {
         
        const d = await db.certificates.destroy({ where: { id } })
        if (d) return "certificate is deleted !!"
        else return "there is no certificate!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};