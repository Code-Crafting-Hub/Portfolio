const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
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

const projectModel = mongoose.model('project',projectSchema)

module.exports = projectModel