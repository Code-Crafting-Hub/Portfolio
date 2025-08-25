const express = require('express')
const userController = require('../controllers/user.controller')
const userMid = require('../middleware/userMid')
const verifyMid = require('../middleware/verifyMid')

const userRoute = express.Router()

const {login, signup, logout, updateData, deleteProfile, downloadFile, data} = userController

userRoute.post('/login', login)
userRoute.post('/signup', signup)
userRoute.post('/logout', logout)

// file download
userRoute.get('/download', userMid, downloadFile)
userRoute.get('/verify',verifyMid)
userRoute.get('/data',userMid, data)
// userRoute.post('/update',updateData)
// userRoute.post('/delete',deleteProfile)

module.exports = userRoute