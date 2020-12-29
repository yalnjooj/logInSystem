const { gql } = require('apollo-server-express');
const { PubSub, withFilter } = require('apollo-server');

const db = require("../../Server/database").db;
const bcrypt = require('bcryptjs');


const typeDefs = gql`
scalar Date

  
type Query {
  users: [User]
  user(id: ID!): User
}

type Mutation {
  createUser(email: String!, password: String!): User!
  updateUser(id: ID!, email: String, password: String): User!
  deleteUser(id: ID!): String!
  login(email: String!, password: String!): AuthPayload
  signup(email: String!, password: String!): AuthPayload
}


type User {
  id: ID!
  email: String
  password: String
  isActive: Boolean
  createdAt: Date
  updatedAt: Date
  
  roleId: Int
  role: Role
}

type AuthPayload {
    user: User
  }

  type Subscription {
    userCreated: User
    userUpdated (id: ID!): User
}
`

const USER_CREATED = 'USER_CREATED';
const USER_UPDATED = 'USER_UPDATED';
const pubsub = new PubSub();

const resolvers = {

  Query: {
    users: async () => await db.users.findAll(),
    user: async (obj, args, context, info) => await db.users.findById(args.id)
  },
  User: {
    role: async (obj, args, context, info) => await db.roles.findByPk(obj.roleId),
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      // instead of email you can pass username as well
      const { user, info } = await context.authenticate("graphql-local", {
        email,
        password
      });

      // only required if express-session is used
      await context.login(user);

      return { user };
    },
    async createUser(root, { email, password }, { models }) {
      const cu = await db.users.create({
        email,
        password: await bcrypt.hash(password, 10)
      })
      await pubsub.publish(USER_CREATED, {userCreated: cu});
      return cu
    },

    async updateUser(root, { id, email, password }, { models }) {

      const uu = await db.users.findByPk(id);
      await uu.update({email, password: await bcrypt.hash(password, 10)})
      await pubsub.publish(USER_UPDATED, {userUpdated: uu});
      return uu

    },

    async deleteUser(root, { id }, { models }) {
      const d = await db.users.destroy({ where: { id } })
      if (d) return "user is deleted !!"
      else return "there is no user!!"
    }

  },
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED])
    },
    userUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USER_UPDATED),
        (payload, variables) =>{

          return payload.userUpdated.id == variables.id;
        }
      )
    }
  }
}



module.exports = { typeDefs, resolvers };