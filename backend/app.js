const express = require('express')
const userRoute = require('./routes/user.routes')
const adminRoute = require('./routes/admin.routes')
const data = require('./routes/adminData.routes')
const cloudinary = require('cloudinary')
const fileUpload = require('express-fileupload')
const {dbConnection} = require('./database/database')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

dbConnection()

app.use('/api/v1/user', userRoute)
app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/data', data)

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key:  process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = {app}