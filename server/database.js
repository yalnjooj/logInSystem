const Sequelize = require('sequelize');

const db = {}
const database = new Sequelize('certificatesProjectNew', 'root', 'toor', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // <http://docs.sequelizejs.com/manual/tutorial/querying.html#operators>
    operatorsAliases: false,
})


const sequelizeModels = require('../SequelizeModels')

// Initialize models
sequelizeModels.forEach(model => {
    const seqModel = model(database, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})


db.sequelize = database
db.Sequelize = Sequelize


database.authenticate().then(() => {
    console.log('\n ** Database is connected ** !! \n')
}).catch(err => {
    console.log('\n ** Can not connecte with Database ** !! \n')
});

module.exports = { database, db };
