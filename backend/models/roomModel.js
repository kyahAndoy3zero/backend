const mongoose = require('mongoose')


const roomModelSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'faculties', 
    },
    profileCount: {
        type: Number,
        ref: 'students'
    },
    name: {
        type: String,
        required: true,
        ref: 'faculties'
    },
    course: {
        type: String,
        required: true,
        ref: 'rooms'
    },
    year : {
        type: Number,
        required: [true, 'Please add Year'],
        ref: 'rooms'
    },
    section : {
        type: String,
        required: [true, 'Please add Section'],
        ref: 'rooms'
    },
}, { timestamps: true

})


module.exports = mongoose.model('rooms', roomModelSchema)