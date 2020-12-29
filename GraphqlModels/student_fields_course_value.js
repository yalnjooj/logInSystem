const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const typeDefs = gql`

extend type Query {
  StudentFieldCourseValues: [StudentFieldCourseValue]
  StudentFieldCourseValue( uID: Int! couId: Int! stuId: Int ): [StudentFieldCourseValue]
}

extend type Mutation {
  createStudentFieldCourseValue(value: String uID: Int! fieldscertificatelookup: Int! couId: Int! stuId: Int! ): StudentFieldCourseValue!
  updateStudentFieldCourseValue(id: ID! value: String!): String!
  deleteStudentFieldCourseValue(id: ID!): String!
}

type StudentFieldCourseValue {
  id: ID!
  value: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  cer_field_lookup_id: Int
  cerFieldLookup: FieldsCertificateLookup

  couId: Int
  course: Course

  stuId: Int 
  student: Student 
}
`

const resolvers = {
  Query: {
    StudentFieldCourseValues: async () => await db.studentfieldcoursevalue.findAll(),
    StudentFieldCourseValue: async (obj, args, context, info) => await db.studentfieldcoursevalue.findAll({where: {[Op.and]: [{uID: args.uID, couId: args.couId, stuId: args.stuId }]}})

    },
    StudentFieldCourseValue: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        course: async (obj, args, context, info) => await db.courses.findByPk(obj.cou_id),
        student: async (obj, args, context, info) => await db.students.findByPk(obj.stuId),
        cerFieldLookup: async (obj, args, context, info) => await db.fieldscertificatelookup.findByPk(obj.cer_field_lookup_id)

    },
    Mutation: {
      async createStudentFieldCourseValue(root, { value, uID, couId, stuId }, { models }) {
        return await db.studentfieldcoursevalue.create({
          value,
          uID,
          couId,
          stuId
        })
  
      },
  
      async updateStudentFieldCourseValue(root, { id, value }, { models }) {
  
        const u = await db.studentfieldcoursevalue.update({
          value
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Student Field Course Value is updated !"
  
      },
  
      async deleteStudentFieldCourseValue(root, { id }, { models }) {
        
        const d = await db.studentfieldcoursevalue.destroy({ where: { id } })
        if (d) return "Student Field Course Value is deleted !!"
        else return "there is no Student Field Course Value!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};