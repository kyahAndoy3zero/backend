const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    img_desc: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: [true, 'Please add a role']
    },
    id_number: {
        type: Number,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('person', profileSchema)