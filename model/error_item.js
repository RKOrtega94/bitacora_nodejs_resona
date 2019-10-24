//Imports
var Sequelize = require('sequelize')

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://lvozwwbiihhhqp:eba0866a9c3682a970309066ec1fb9ef10b0138492efc73a4e56841d279e3239@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d26go21gq41h86?ssl=true')

//Setup Error_item model and its fields
var Error_item = sequelize.define(
    'Error_item', {
    error: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    ecac: {
        type: Sequelize.BOOLEAN,
        allowNUll: false
    },
    ecan: {
        type: Sequelize.BOOLEAN,
        allowNUll: false
    },
    ecuf: {
        type: Sequelize.BOOLEAN,
        allowNUll: false
    },
    status: {
        type: Sequelize.ENUM,
        values: ['enabled', 'disabled']
    }
})

sequelize.sync()
    .then(() => console.log('Error_item table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error))

// export Error_item model for use in other files.
module.exports = Error_item