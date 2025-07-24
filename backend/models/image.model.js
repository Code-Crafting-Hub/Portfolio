const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    name:{
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
    }
})

const imgModel = mongoose.model('Image',imageSchema)

module.exports = imgModel