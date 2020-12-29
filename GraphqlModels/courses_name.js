const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  coursesNames: [CoursesName]
  coursesName(id: ID!): CoursesName
}

extend type Mutation {
  createCoursesName(name: String uID: Int!): CoursesName!
  updateCoursesName(id: ID! name: String!): String!
  deleteCoursesName(id: ID!): String!
}

type CoursesName {
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
    coursesNames: async () => await db.coursesname.findAll(),
    coursesName: async (obj, args, context, info) => await db.coursesname.findByPk(args.id)
    },
    CoursesName: {
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