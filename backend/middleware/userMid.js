const jwt = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../models/user.model");

const userMid = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ errors: "Unauthorized access" });
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "null") {
        return res.status(401).json({ errors: "Unauthorized access" });
    }
    try{
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ errors: "Unauthorized access" });
        } 
        req.userId = decoded.id;
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }
        next();
    }catch(error){
        console.log("error in userMid",error);
        return res.status(401).json({ errors: "Unauthorized access" });
    }
}

module.exports = userMid;