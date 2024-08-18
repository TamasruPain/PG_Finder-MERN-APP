const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    userPhone: {
        type: String,
        required: true
    },
    userDOB: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('usersDoc', userSchema);
