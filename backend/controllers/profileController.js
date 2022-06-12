const asyncHandler = require('express-async-handler')
const studentProfiles = require('../models/studentProfileModel')
const rooms = require('../models/roomModel')
const sharp = require('sharp')
const base64 = require('node-base64-image')
const fs = require('fs')
const multer = require('multer')

const createProfile = asyncHandler(async(req, res) => {




    const room = await rooms.findById(req.params.id)
    const {name, id_number, image} = req.body
    const userExist = await studentProfiles.findOne({id_number})


    //Image Optimization
    const roomDir = `images/${room.course}-${room.year}${room.section}`
    const imageString = image.split(',')[1];

    let profileFolder = fs.existsSync(`${roomDir}/image-profiles/`)

    if(!profileFolder){
        fs.mkdir(`${roomDir}/image-profiles/`, {recursive: true}, (error) => {
            if(error) throw error
    
         })
    }

    await base64.decode(imageString, {fname: `${roomDir}/image-profiles/${name}`, ext:"jpg"})

    let optiFolderExist = fs.existsSync(`${roomDir}/optimize-img/`)

    if(!optiFolderExist){
        fs.mkdir(`${roomDir}/optimize-img/`, {recursive: true}, (error) => {
            if(error) throw error
          
         })
    }

    await sharp(`${roomDir}/image-profiles/${name}.jpg`).jpeg({quality: 50}).toFile(`${roomDir}/optimize-img/${name}.jpg`)

   
    fs.rm(`${roomDir}/image-profiles`, {recursive: true}, (err) => {
        if(err){console.log(err)}
     })

   
    const finalImage = fs.readFileSync(`${roomDir}/optimize-img/${name}.jpg`, "base64")

   


    if (userExist) {
        res.status(400)
        throw new Error('Student Profile Already Exist')
    }

    if(!name || !id_number || !image){
        res.status(400)
       throw new Error('Please Provide Room Detials')
    }
    
    if(!room){
        res.status(400)
        throw new Error('Room not Found')
    }

    const newStudentProfile = await studentProfiles.create({
        name,
        id_number,
        image: `data:image/jpeg;base64,${finalImage}`,
        course: room.course,
        year: room.year,
        section: room.section,
        room_owner: room.name,
        room_owner_id: room.user,
        room_id: req.params.id
    })
    
    if(newStudentProfile){
        await rooms.updateOne({_id: req.params.id}, {$inc: {profileCount: 1}})
        res.status(201).json(newStudentProfile)
       }
})



const getProfiles = asyncHandler(async(req, res) => {

    const studentProfile = await studentProfiles.find({room_id: req.params.id})
    res.status(200).json(studentProfile)
})


const deleteProfile = asyncHandler(async(req, res) => {

    const studentProfile = await studentProfiles.findById(req.params.id)

    if(!studentProfile){
        res.status(400)
        throw new Error('Profile not Found')
    }
    if(studentProfile){
     await rooms.updateOne({room_id: studentProfile.room_id}, {$inc: {profileCount: -1}})
    }
    await studentProfile.remove()

    res.status(200).json({id: req.params.id})

})


module.exports = {
   createProfile,
   getProfiles,
   deleteProfile
}