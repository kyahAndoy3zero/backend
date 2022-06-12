const express = require('express')
const router = express.Router()
const {registerClerk, loginClerk, profileClerk} = require('../controllers/clerkController')
const {protect} = require('../middlewares/authMiddleware')

router.post('/', registerClerk)
router.post('/login', loginClerk)
router.get('/profile', protect, profileClerk)

module.exports = router