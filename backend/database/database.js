const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false; // Cache connection state

const dbConnection = async () => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.DBURI);
        isConnected = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting database:", error);
        throw error; // Throw the error so the app knows it failed
    }
}

module.exports = { dbConnection };