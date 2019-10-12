//Imports
var Sequelize = require('sequelize')

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://lvozwwbiihhhqp:eba0866a9c3682a970309066ec1fb9ef10b0138492efc73a4e56841d279e3239@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d26go21gq41h86?ssl=true')

//Setup Indicators model and its fields
var Indicator = sequelize.define(
    'Indicators', {
    indicator: {
        type: Sequelize.STRING,
        unique: true,
        alloNull: false
    },
    min: {
        type: Sequelize.FLOAT,
        alloNull: false
    },
    max: {
        type: Sequelize.FLOAT,
        alloNull: false
    },
    status: {
        type: Sequelize.ENUM,
        values: ['enabled', 'disabled']
    }
})

sequelize.sync()
    .then(() => console.log('indicator table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error))

// export User model for use in other files.
module.exports = Indicator