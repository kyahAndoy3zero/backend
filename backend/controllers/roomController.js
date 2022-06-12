const asyncHandler = require('express-async-handler')
const rooms = require('../models/roomModel')
const faculty = require('../models/userModel')
const studentProfile = require('../models/studentProfileModel')
const fs = require('fs')




const createRoom = asyncHandler(async (req, res) => {




   const {course, year, section} = req.body
   const user = req.user.id
   const name = await faculty.findById(req.user.id)
 

    if(!course || !year || !section){
       res.status(400)
       throw new Error('Please Provide Room Detials')
   }

   const room = await rooms.create({
    course,
    year,
    section,
    name: name.name,
    profileCount: 0, 
    user
   })

   if(room){   
    res.status(201).json(room)
   }

   const roomDir = `images/${course}-${year}${section}/image-profiles`
   let folderExist = fs.existsSync(roomDir)

   if(!folderExist){
      fs.mkdir(roomDir, {recursive: true}, (error) => {
         if(error) throw error
         console.log(`${roomDir} created`)
      })
   }
})


const getRooms = asyncHandler(async (req, res) => {
   const room = await rooms.find({user: req.user.id})
   res.status(200).json(room)

})


const allClerkRoom = asyncHandler(async (req, res) => {
   const room = await rooms.find({});
   res.status(200).json(room)

})

const deleteRooms = asyncHandler(async(req, res) => {
   
   const room = await rooms.findById(req.params.id)
   await studentProfile.deleteMany({room_id: room._id})
   const roomDir = `images/${room.course}-${room.year}${room.section}`

   if(!room){
      res.status(400)
      throw new Error('Room not Found')
   }

   if(!req.user){
      res.status(401)
      throw new Error('User not Found')
   }

   if(room.user.toString() !== req.user.id){
      res.status(401)
      throw new Error('User Not Authorized')
   }
   
   await room.remove()
   res.status(200).json({id: req.params.id})
   fs.rm(roomDir, {recursive: true}, (err) => {
      // if(err) throw new err;
      if(err){
         console.log(err)
      }
      console.log(`${roomDir} deleted`)
   })
})


module.exports = {
    createRoom,
    getRooms,
    deleteRooms,
    allClerkRoom
 }