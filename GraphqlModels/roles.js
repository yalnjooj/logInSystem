const { gql } = require('apollo-server-express');
const db = require("../../Server/database").db;

const typeDefs = gql`

extend type Query {
  roles: [Role]
  role(id: ID!): Role
}

extend type Mutation {
  createRole(role_name: String! uID: Int!): Role!
  updateRole(id: ID!, role_name: String!): String!
  deleteRole(id: ID!): String!
}

type Role {
  id: ID!
  role_name: String
  createdAt: Date
  updatedAt: Date

  uID: Int
  user: User
}
`

const resolvers = {
  Query: {
    roles: async () => await db.roles.findAll(),
    role: async (obj, args, context, info) => await db.roles.findByPk(args.id)
  },
  Role: {
    user: async (obj, args, context, info) => db.users.findByPk(obj.uID),
  },
  Mutation: {
    async createRole(root, { role_name, uID }, { models }) {
      return await db.roles.create({
        role_name,
        uID
      })

    },

    async updateRole(root, { id, email, password }, { models }) {

      const u = await db.users.update({
        password: await bcrypt.hash(password, 10),
        email
      }, { where: { id } })

      if (!u[0]) return "No updated!!"
      else return "user is updated !"

    },

    async deleteRole(root, { id }, { models }) {
      const d = await db.users.destroy({ where: { id } })
      if (d) return "user is deleted !!"
      else return "there is no user!!"
    }

  }
}



module.exports = { typeDefs, resolvers };