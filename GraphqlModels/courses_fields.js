const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  coursesfieldsnames: [CourseFieldName]
  coursefieldname(id: ID!): CourseFieldName
}

extend type Mutation {
  createCourseFieldName(name: String uID: Int!): CourseFieldName!
  updateCourseFieldName(id: ID! name: String!): String!
  deleteCourseFieldName(id: ID!): String!
}

type CourseFieldName {
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
    coursesfieldsnames: async () => await db.coursesfields.findAll(),
    coursefieldname: async (obj, args, context, info) => await db.coursesfields.findByPk(args.id)
    },
    CourseFieldName: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
    },
    Mutation: {
      async createCourseFieldName(root, { name, uID }, { models }) {
        return await db.coursesfields.create({
          name,
          uID
        })
  
      },
  
      async updateCourseFieldName(root, { id, name }, { models }) {
  
        const u = await db.coursesfields.update({
          name
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "course field name is updated !"
  
      },
  
      async deleteCourseFieldName(root, { id }, { models }) {
         
        const d = await db.coursesfields.destroy({ where: { id } })
        if (d) return "course field name is deleted !!"
        else return "there is no course field name!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};