const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  courses: [Course]
  course(uID: ID!): [Course]
}

extend type Mutation {
  createCourse(place: String! hours: Int! price: String! uID: Int! cer_id: Int! cou_N_id: Int! coache_id: Int! category_id: Int!): Course!
  updateCourse(id: ID! place: String hours: Int price: String cer_id: Int cou_N_id: Int coache_id: Int category_id: Int): String!
  deleteCourse(id: ID!): String!
}

type Course {
  id: ID!
  place: String
  hours: Int
  price: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User

  cer_id: Int
  certificate: Certificate

  cou_N_id: Int
  courseName: CertificateName

  coache_id: Int
  coache: Coache

  category_id: Int
  category: Catagory
}
`

const resolvers = {
  Query: {
    courses: async () => await db.courses.findAll(),
    course: async (obj, args, context, info) => await db.courses.findAll({where: {uID: args.uID}})
    },
    Course: {
        user: async (obj, args, context, info) => await db.users.findByPk(obj.uID),
        certificate: async (obj, args, context, info) => await db.certificates.findByPk(obj.cer_id),
        courseName: async (obj, args, context, info) => await db.coursesname.findByPk(obj.cou_N_id),
        coache: async (obj, args, context, info) => await db.coaches.findByPk(obj.coache_id),
        category: async (obj, args, context, info) => await db.catagory.findByPk(obj.category_id)
    },
    Mutation: {
      async createCourse(root, { place, hours, price, uID, cer_id, cou_N_id, coache_id, category_id }, { models }) {
        return await db.courses.create({
          place,
          hours,
          price,
          uID,
          cer_id,
          cou_N_id,
          coache_id,
          category_id
        })
  
      },
    
  
      async updateCourse(root, { id, place, hours, price, cer_id, cou_N_id, coache_id, category_id }, { models }) {
  
        const u = await db.courses.update({
          place,
          hours,
          price,
          cer_id,
          cou_N_id,
          coache_id,
          category_id
        }, { where: { id } })
  
        if (!u[0]) return "No updated!!"
        else return "Course name is updated !"
  
      },
  
      async deleteCourse(root, { id }, { models }) {
         
        const d = await db.courses.destroy({ where: { id } })
        if (d) return "Course name is deleted !!"
        else return "there is no Course name!!"
      }
  
    }
}



module.exports = {typeDefs, resolvers};