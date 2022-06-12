const express = require('express')
const router = express.Router()
const {Hello} = require('../controllers/HelloController')


router.get('/', Hello)

module.exports = router