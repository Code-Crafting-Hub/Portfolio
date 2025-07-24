const express = require('express')
const adminController = require('../controllers/admin.controller')

const adminRoute = express.Router()

const {login, logout, signup} = adminController

adminRoute.post("/login",login)
adminRoute.post('/logout',logout)
adminRoute.post('/signup',signup)

module.exports = adminRoute