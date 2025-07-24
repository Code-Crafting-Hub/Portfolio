const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    image: {
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        }
    },
})

const contactModel = mongoose.model('contact', infoSchema)

module.exports = contactModel