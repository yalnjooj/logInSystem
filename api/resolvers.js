const { v4 } = require('uuid')
const { database, db } = require("../server/database")
const bcrypt = require('bcryptjs');
const { PubSub, withFilter,  } = require('apollo-server');

const pubsub = new PubSub();
const resolvers = {
  Subscription: {
    dataUpdated: {
      subscribe: withFilter((parent, args, context,) => {

        if (context.isUnauthenticated()) {
          throw new Error('You need to be logged in');
        }
        return pubsub.asyncIterator(['DATA_UPDATED'])
      },

        (payload, variables, context) => {
          console.log(context.getUser())

          return payload.dataUpdated.id == context.user.id
        },
      )
    },
  },
  Query: {
    currentUser: async (parent, args, context) => {

      const user = await context.getUser()
      return user;
    }

  },
  Mutation: {
    signup: async (parent, { email, password }, context) => {

      const userWithEmailAlreadyExists = await context.db.users.findOne({ where: { email: email } });

      if (userWithEmailAlreadyExists) {
        throw new Error('User with email already exists');
      } else {

        const newUser = await context.db.users.create({
          email,
          password: await bcrypt.hash(password, 10)
        })

        await context.login(newUser);
        return { user: newUser };
      }


    },
    login: async (parent, { email, password }, context) => {

      const { user } = await context.authenticate('graphql-local', { email, password });
      await context.login(user);
      return { user }
    },
    logout: async (parent, args, context) => context.logout(),

    currentUser: async (parent, args, context) => {
      const user = context.getUser()
      await pubsub.publish('DATA_UPDATED', { userUpdated: user });

      return user;
    }
  }

};



module.exports = resolvers;