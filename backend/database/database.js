const dns = require('node:dns/promises');
dns.setServers(['8.8.8.8', '1.1.1.1']);

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