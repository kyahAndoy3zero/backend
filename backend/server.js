const colors = require('colors')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors');
const express = require('express')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/ErrorMiddleWare')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

connectDB()



const app = express()
app.use(bodyParser.json({limit: "5mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "5mb", extended: true}))
app.use(cors())

//Routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/profile', require('./routes/profileRoutes'))
app.use('/api/room', require('./routes/roomRoutes'))
app.use('/api/clerk', require('./routes/clerkRoutes'))


// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '../client/build')))
    
//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
// }


app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`)) 