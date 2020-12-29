const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  students: [Student]
  student(id: ID!): Student
}

extend type Mutation {
  createStudent(name: String! catagoryId: Int! email: String! phone: Int! uID: Int!): Student!
  updateStudent(id: ID! name: String catagoryId: Int email: String phone: Int): String!
  deleteStudent(id: ID!): String!
}

type Student {
  id: ID!
  name: String
  email: String
  phone: Int
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  catagoryId: Int
  catagory: Catagory
}
`

const resolvers = {
  Query: {
    students: async () => await db.students.findAll(),
    student: async (obj, args, context, info) => await db.students.findByPk(args.id)
    },
    Student: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        catagory: async (obj, args, context, info) => await db.catagory.findByPk(obj.catagoryId)
    },
    Mutation: {
      async createStudent(root, { name, catagoryId, email, phone, uID }, { models }) {
        return await db.students.create({
          name,
          catagoryId,
          email,
          phone,
          uID
        })
  
      },
  
      async updateStudent(root, { id, catagoryId, name, email, phone }, { models }) {
  
        const u = await db.students.update({
          name,
          catagoryId,
          email,
          phone,
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Student is updated !"
  
      },
  
      async deleteStudent(root, { id }, { models }) {
         
        const d = await db.students.destroy({ where: { id } })
        if (d) return "Student is deleted !!"
        else return "there is no Student!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};
