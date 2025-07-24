const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    }
})

const serviceModel = mongoose.model('sevices',serviceSchema)

module.exports = serviceModel