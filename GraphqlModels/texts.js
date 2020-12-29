const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const typeDefs = gql`

extend type Query {
  texts: [Text]
  text(id: ID!): Text
  userCerText(uID: Int, certificates_ID: Int): [Text]
}

extend type Mutation {
  createText(value: String! uID: Int! certificates_ID: Int! lang_sex_ID: Int!): Text!
  updateText(id: ID! value: String!): String!
  deleteText(id: ID!): String!
}

type Text {
  id: ID!
  value: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  certificates_ID: Int
  certificates: Certificate

  lang_sex_ID: Int
  langSex: LangSex
}
`




const resolvers = {
  Query: {
    texts: async () => await db.texts.findAll(),
    text: async (obj, args, context, info) => await db.texts.findByPk(args.id),
    userCerText: async (obj, args, context, info) => await db.texts.findAll({where: {[Op.and]: [{uID: args.uID, certificates_ID: args.certificates_ID}]}})

    },
    Text: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        certificates: async (obj, args, context, info) => await db.certificates.findByPk(obj.certificates_ID),
        langSex: async (obj, args, context, info) => await db.langsex.findByPk(obj.lang_sex_ID),
    },
    Mutation: {
      async createText(root, { value, uID, certificates_ID, lang_sex_ID }, { models }) {
        return await db.texts.create({
          value,
          uID,
          certificates_ID,
          lang_sex_ID
        })
  
      },
  
      async updateText(root, { id, value }, { models }) {
  
        const u = await db.texts.update({
          value
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "text is updated !"
  
      },
  
      async deleteText(root, { id }, { models }) {
         
        const d = await db.texts.destroy({ where: { id } })
        if (d) return "text is deleted !!"
        else return "there is no text!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};