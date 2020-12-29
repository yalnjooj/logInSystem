const express = require('express')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { v4 } = require('uuid')
const passport = require('passport')
const User = require('./User')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { GraphQLLocalStrategy, buildContext, createOnConnect } = require('graphql-passport')
const { database, db } = require("../server/database")
const bcrypt = require("bcryptjs");
const { turn } = require('../SequelizeModels');
const FacebookStrategy = require('passport-facebook');
const http = require('http');
const app = express();

// Local Strategy
passport.use(
    new GraphQLLocalStrategy(async (email, password, done) => {

        const matchingUser = await db.users.findOne({ where: { email: email } });

        if (!matchingUser) {
            done(new Error('لا يوجد مستخدم مسجل بهذا العنوان!'), null);
        } else {

            bcrypt.compare(password, matchingUser.dataValues.password, (err, validPassword) => {
                if (err) throw err;

                if (!validPassword) {
                    done(new Error('كلمة المرور غير صحيحة!'), null);

                } else {
                    if (!matchingUser.dataValues.isActive) {
                        done(new Error('حسابك غير مفعل، راجع إدارة الشركة !!'), null);
                    } else {
                        done(null, matchingUser);
                    }
                }
            });



        }
    }),
);


// Facebook Strategy

const facebookOptions = {
    clientID: '///////',
    clientSecret: '////',
    callbackURL: 'http://localhost:4000/auth/facebook/callback',
    profileFields: ['id', 'first_name', 'last_name', 'displayName', 'photos', 'email'],
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
    const matchingUser = await db.users.findOne({ where: { id: profile.id } });
    if (matchingUser) {
        done(null, matchingUser);
        return;
    }
    const newUser = await db.users.create({
        id: profile.id,
        email: '///////',
        password: '/////'
    })
    done(null, newUser);
};

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:4000/graphql',
    failureRedirect: 'http://localhost:4000/graphql',
}));


passport.use(new FacebookStrategy(
    facebookOptions,
    facebookCallback,
));





const SESSION_SECRECT = '109156be-c4fb-41ea-b1b4-efe1671c5836';


passport.serializeUser((user, done) => {

    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    const matchingUser = await db.users.findByPk(id);
    done(null, matchingUser);
});

const sessionStore = new SequelizeStore({
    db: database,
    checkExpirationInterval: 60 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 60 * 60 * 24 * 1 // 1 day // The maximum age (in milliseconds) of a valid session.
});
sessionStore.sync()


const sessionMiddleware = session({
    name: 'full login system',
    secret: SESSION_SECRECT,
    genid: v4,
    cookie: {
        secure: false,   // use secure cookies for production meaning they will only be sent via https
        path: '/',
        secure: false, // TODO : TRUE IN PRODUCTION*/
        sameSite: true,
        httpOnly: false, // if true, well disallwo Javascript to reading cookie data
        //maxAge: new Date(Date.now() + (30 * 86400 * 1000)),  // TODO : env  --> one hour
        expires: 1000 * 60 * 60 * 24 * 7 //  7 days
    },
    resave: false,
    saveUninitialized: false,
    store: sessionStore,

})
const passportMiddleware = passport.initialize();
const passportSessionMiddleware = passport.session(); // if session is used 

app.use(sessionMiddleware);
app.use(passportMiddleware);
app.use(passportSessionMiddleware);



const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => buildContext({ req, res, db }),
    subscriptions: {
        onConnect: createOnConnect([
            sessionMiddleware,
            passportMiddleware,
            passportSessionMiddleware,
        ])
    },

});

apolloServer.applyMiddleware({ app, cors: false });




const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

const PORT = 4000;
httpServer.listen({ port: PORT }, (port) => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
});