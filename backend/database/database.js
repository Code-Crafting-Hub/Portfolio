const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.DBURI)
        console.log("Database connected successfully")
    }catch(error){
        console.log("Error while connecting database",error)
    }
}

module.exports = {dbConnection}