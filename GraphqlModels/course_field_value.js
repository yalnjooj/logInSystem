const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const typeDefs = gql`

extend type Query {
  CourseFieldValues: [CourseFieldValue]
  CourseFieldValue( uID: Int! cou_id: Int! ): [CourseFieldValue]
}

extend type Mutation {
  createCourseFieldValue(value: String uID: Int! cou_id: Int! cer_field_lookup_id: Int! ): CourseFieldValue!
  updateCourseFieldValue(id: ID! value: String!): String!
  deleteCourseFieldValue(id: ID!): String!
}

type CourseFieldValue {
  id: ID!
  value: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  cou_id: Int
  course: Course

  cer_field_lookup_id: Int 
  fieldscertificatelookup: FieldsCertificateLookup 
}
`

const resolvers = {
  Query: {
    CourseFieldValues: async () => await db.coursefieldvalue.findAll(),
    CourseFieldValue: async (obj, args, context, info) => await db.coursefieldvalue.findAll({where: {[Op.and]: [{uID: args.uID, cou_id: args.cou_id }]}})
    },
    CourseFieldValue: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        course: async (obj, args, context, info) => await db.courses.findByPk(obj.cou_id),
        fieldscertificatelookup: async (obj, args, context, info) => await db.fieldscertificatelookup.findByPk(obj.cer_field_lookup_id),

    },
    Mutation: {
      async createCourseFieldValue(root, { value, uID, cou_id, cer_field_lookup_id }, { models }) {
        return await db.coursefieldvalue.create({
          value,
          uID,
          cou_id,
          cer_field_lookup_id
        })
  
      },
  
      async updateCourseFieldValue(root, { id, value }, { models }) {
  
        const u = await db.coursefieldvalue.update({
          value
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Course Field Value is updated !"
  
      },
  
      async deleteCourseFieldValue(root, { id }, { models }) {
         
        const d = await db.coursefieldvalue.destroy({ where: { id } })
        if (d) return "Course Field Value is deleted !!"
        else return "there is no Course Field Value!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};