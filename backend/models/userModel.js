const mongoose = require('mongoose')

const clerkUserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add your name']
    }, 
    lastName: {
        type: String,
        required: [true, 'Please add your name']
    },
    email: {
        type: String,
        required: [true, 'Please add your email']
    },
    password: {
        type: String,
        required: [true, 'Please add your password']
    },

}, {
    timestamps: true
})


module.exports = mongoose.model('clerk', clerkUserSchema)