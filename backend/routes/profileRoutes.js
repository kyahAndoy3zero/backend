const express = require('express')
const router = express.Router()
const {createProfile, getProfiles} = require('../controllers/profileController')
const {protect} = require('../middlewares/authMiddleware')


router.post('/', protect, createProfile).get('/', protect, getProfiles)
// router.delete('/:id', protect, deleteProfile)

module.exports = router