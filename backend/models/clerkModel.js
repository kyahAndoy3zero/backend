const mongoose = require('mongoose')

const clerkModelSchema = mongoose.Schema({
    name: {
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


module.exports = mongoose.model('clerk', clerkModelSchema)