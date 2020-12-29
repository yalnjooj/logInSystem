const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  resetPasswords: [ResetPassword]
  coursesName(id: ID!): ResetPassword
}

extend type Mutation {
  createResetPassword(resetPassword: String resetPassword: Int!): ResetPassword!
  updateResetPassword(id: ID! name: String!): String!
  deleteResetPassword(id: ID!): String!
}

type ResetPassword {
  id: ID!
  reset_password_token: String
  reset_password_expire: Date
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User
}
`

const resolvers = {
  Query: {
    coursesNames: async () => await db.coursesname.findAll(),
    coursesName: async (obj, args, context, info) => await db.coursesname.findByPk(args.id)
    },
    ResetPassword: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createCoursesName(root, { name, uID }, { models }) {
        return await db.coursesname.create({
          name,
          uID
        })
  
      },
  
      async updateCoursesName(root, { id, name }, { models }) {
  
        const u = await db.coursesname.update({
          name
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "courses name is updated !"
  
      },
  
      async deleteCoursesName(root, { id }, { models }) {
         
        const d = await db.coursesname.destroy({ where: { id } })
        if (d) return "courses name is deleted !!"
        else return "there is no courses name!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};