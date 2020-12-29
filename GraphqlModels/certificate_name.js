const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  certificateNames: [CertificateName]
  certificateName(id: ID!): CertificateName
}

extend type Mutation {
  createCertificateName(name: String uID: Int!): CertificateName!
  updateCertificateName(id: ID! name: String!): String!
  deleteCertificateName(id: ID!): String!
}

type CertificateName {
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
    certificateNames: async () => await db.certificatename.findAll(),
    certificateName: async (obj, args, context, info) => await db.certificatename.findByPk(args.id)
    },
    CertificateName: {
        user: async (obj, args, context, info) => db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createCertificateName(root, { name, uID }, { models }) {
        return await db.certificatename.create({
          name,
          uID
        })
  
      },
  
      async updateCertificateName(root, { id, name }, { models }) {
  
        const u = await db.certificatename.update({
          name
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "certificate name is updated !"
  
      },
  
      async deleteCertificateName(root, { id }, { models }) {
        
        const d = await db.certificatename.destroy({ where: { id } })
        if (d) return "certificate name is deleted !!"
        else return "there is no certificate name!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};