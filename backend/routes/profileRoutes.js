const express = require('express')
const router = express.Router()
const {createProfile, getProfiles, deleteProfile} = require('../controllers/profileController')
const {protect} = require('../middlewares/authMiddleware')


router.post('/:id', protect, createProfile)
router.get('/:id', protect, getProfiles)
router.delete('/:id', protect, deleteProfile)

module.exports = router