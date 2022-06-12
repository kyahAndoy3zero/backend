const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const clerk = require('../models/clerkModel')
const bcrypt = require('bcryptjs') 


const registerClerk = asyncHandler (async (req, res ) => {

    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please provide fields')
    }

    const userExist = await clerk.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User Already Exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
        
    const user = await clerk.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Admin User Data')
    }

})


const loginClerk = asyncHandler(async (req, res) => {
  
    const { email, password } = req.body
    const user = await clerk.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: 'Log In',
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})



const profileClerk = asyncHandler(async (req, res) => {
 
    const { _id, name, email } = await clerk.findById(req.user.id)
   
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}




module.exports = {
   registerClerk,
   loginClerk,
   profileClerk
}