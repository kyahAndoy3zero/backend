const express = require('express')
const router = express.Router()
const {createRoom, getRooms, deleteRooms, allClerkRoom} = require('../controllers/roomController')
const {protect} = require('../middlewares/authMiddleware')


router.post('/', protect, createRoom).get('/', protect, getRooms).get('/clerk/all-rooms', protect, allClerkRoom)
router.delete('/:id', protect, deleteRooms)

module.exports = router