const express = require('express')
const data = express.Router()
const adminMid = require("../middleware/adminMid")
const adminData = require("../controllers/admindata.control")

const {userData, createProjects, updateProject, deleteProject, getProjects, createContact, updateContact, deleteContact, getContact,createImage,deleteImage, getImage, createService, deleteService, getService, uploadPdf, getPdf} = adminData

data.get('/userData', adminMid, userData)

// Project routes

data.post('/create', adminMid, createProjects)
data.put('/update/:projectId', adminMid, updateProject)
data.delete('/delete/:projectId', adminMid, deleteProject)
data.get("/projects", getProjects)

// Contact routes

data.post('/create/contact', adminMid, createContact)
data.put('/update/contact/:contactId', adminMid, updateContact)
data.delete('/delete/contact/:contactId', adminMid, deleteContact)
data.get('/contact', getContact)

// Image routes

data.get('/image', getImage)
data.post('/create/img', adminMid, createImage)
data.delete('/delete/img/:imgId', adminMid, deleteImage)

// Services route

data.post('/create/service',adminMid, createService)
data.delete('/delete/service/:serviceId',adminMid, deleteService)
data.get('/service', getService)

// CV route

data.post('/upload-pdf', adminMid, uploadPdf)
data.get('/get-pdf', getPdf)

module.exports = data