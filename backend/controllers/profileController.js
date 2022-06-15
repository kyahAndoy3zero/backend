const asyncHandler = require('express-async-handler')
const personProfile = require('../models/profileModel')



const sharp = require('sharp')
const base64 = require('node-base64-image')
const fs = require('fs')
const multer = require('multer')





const createProfile = asyncHandler(async(req, res) => {

    const {firstName, lastName, img_desc, role, id_number} = req.body
    const userExist = await personProfile.findOne({id_number})

    if (userExist) {
        res.status(400)
        throw new Error('Student Profile Already Exist')
    }

    if(!firstName || !lastName || !img_desc || !role){
        res.status(400)
       throw new Error('Please Provide Room Detials')
    }


    const newPersonProfile = await personProfile.create({
        user: req.user.id,
        firstName,
        lastName,
        img_desc,
        role,
        id_number,
    })


    if(newPersonProfile){
        
        res.status(201).json(newPersonProfile)
       }
})



const getProfiles = asyncHandler(async(req, res) => {
    const persons = await personProfile.find({user: req.user.id})
    res.status(200).json(persons)
})


// const deleteProfile = asyncHandler(async(req, res) => {

//     const studentProfile = await studentProfiles.findById(req.params.id)

//     if(!studentProfile){
//         res.status(400)
//         throw new Error('Profile not Found')
//     }
//     if(studentProfile){
//      await rooms.updateOne({room_id: studentProfile.room_id}, {$inc: {profileCount: -1}})
//     }
//     await studentProfile.remove()
//     res.status(200).json({id: req.params.id})

// })


module.exports = {
   createProfile,
   getProfiles,
//    deleteProfile
}




 //Image Optimization
   
    // const imageString = image.split(',')[1];
    // await base64.decode(imageString, {fname: `${name}/${name}`, ext:"jpg"})

  

    // await sharp(`${name}/${name}.jpg`).jpeg({quality: 50}).toFile(`${name}/name${name}.jpg`)

   
    // fs.rm(`${name}/name`, {recursive: true}, (err) => {
    //     if(err){console.log(err)}
    //  })

   
    // const finalImage = fs.readFileSync(`${roomDir}/optimize-img/${name}.jpg`, "base64")