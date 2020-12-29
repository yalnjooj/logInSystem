const Sequelize = require('sequelize');
const { GraphQLLocalStrategy } = require('graphql-passport');
const Op = Sequelize.Op;
const db = require("../Server/database").db;
const bcrypt = require("bcryptjs");


// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================

const localStrategyLogin = new GraphQLLocalStrategy({ passReqToCallback: true }, async (req, email, password, done) => {

  const matchingUser = await db.users.findOne({ where: { email: email } });

  if (!matchingUser) {
    done(new Error('لا يوجد مستخدم مسجل بهذا العنوان!'), null);
  } else {

    if (!matchingUser.dataValues.isActive) {
      done(new Error('حسابك غير مفعل، راجع إدارة الشركة !!'), null);
    } else {

      bcrypt.compare(password, matchingUser.dataValues.password, (err, validPassword) => {
        if (err) throw err;

        if (!validPassword) {
          done(new Error('كلمة المرور غير صحيحة!'), null);

        } else {

          done(null, matchingUser);
        }
      });

    }




  }



})
// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================



// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================

const localStrategySignUp = new GraphQLLocalStrategy({ passReqToCallback: true }, async (req, email, password, done) => {

  const matchingUser = await db.users.findOne({ where: { email: email } });

  if (!matchingUser) {
    done(new Error('لا يوجد مستخدم مسجل بهذا العنوان!'), null);
  } else {

    if (!matchingUser.dataValues.isActive) {
      done(new Error('حسابك غير مفعل، راجع إدارة الشركة !!'), null);
    } else {

      bcrypt.compare(password, matchingUser.dataValues.password, (err, validPassword) => {
        if (err) throw err;

        if (!validPassword) {
          done(new Error('كلمة المرور غير صحيحة!'), null);

        } else {

          done(null, matchingUser);
        }
      });

    }




  }



})

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================

module.exports = { localStrategyLogin, localStrategySignUp }