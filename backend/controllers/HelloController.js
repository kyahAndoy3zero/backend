const express = require('express')
const router = express.Router()



const Hello = (req, res) => {
    res.send('Hello')
}

module.exports = {
    Hello,

 }