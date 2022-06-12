const mongoose = require('mongoose')

const studentModelSchema = mongoose.Schema({
    room_owner: {
        type: String,
        required: true,
        ref: 'rooms'
    },
    room_owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'rooms'
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'rooms'
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
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    id_number: {
        type: Number,
        required: [true, 'Please add ID Number']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('students', studentModelSchema)