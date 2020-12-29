const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  certificateFieldsTags: [CertificateFieldsTag]
  certificateFieldsTag(id: ID!): CertificateFieldsTag
}

extend type Mutation {
  createCertificateFieldTag(tag_name: String uID: Int!): CertificateFieldsTag!
  updateCertificateFieldTag(id: ID! tag_name: String!): String!
  deleteCertificateFieldTag(id: ID!): String!
}

type CertificateFieldsTag {
  id: ID!
  tag_name: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User
}
`

const resolvers = {
  Query: {
    certificateFieldsTags: async () => await db.certificatefieldstags.findAll(),
    certificateFieldsTag: async (obj, args, context, info) => await db.certificatefieldstags.findByPk(args.id)
    },
    CertificateFieldsTag: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createCertificateFieldTag(root, { tag_name, uID }, { models }) {
        return await db.certificatefieldstags.create({
          tag_name,
          uID
        })
  
      },
  
      async updateCertificateFieldTag(root, { id, tag_name }, { models }) {
  
        const u = await db.certificatefieldstags.update({
          tag_name
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Certificate Field Tags is updated !"
  
      },
  
      async deleteCertificateFieldTag(root, { id }, { models }) {
         
        const d = await db.certificatefieldstags.destroy({ where: { id } })
        if (d) return "Certificate Field Tags is deleted !!"
        else return "there is no Certificate Field Tags!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};