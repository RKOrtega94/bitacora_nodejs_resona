// Imports
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://lvozwwbiihhhqp:eba0866a9c3682a970309066ec1fb9ef10b0138492efc73a4e56841d279e3239@ec2-107-20-167-241.compute-1.amazonaws.com:5432/d26go21gq41h86?ssl=true')

// setup User model and its fields.
var User = sequelize.define(
    'User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.ENUM,
        values: ['user', 'supervisor', 'admin', 'disabled'],
        allowNull: true
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt)
        }
    }
});

User.prototype.validPassword = function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.password, salt)
    return bcrypt.compareSync(password, hash)
}

sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error))

// export User model for use in other files.
module.exports = User