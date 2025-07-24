const jwt = require("jsonwebtoken");
const config = require("../config");
const adminModel = require("../models/admin.model");

const adminMid = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ errors: "Unauthorized access1" });
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "null") {
        return res.status(401).json({ errors: "Unauthorized access2" });
    }
    try{
        const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ errors: "Unauthorized access3" });
        } 
        req.adminId = decoded.id;
        const admin = await adminModel.findById(req.adminId);
        if (!admin) {
            return res.status(404).json({ errors: "User not found" });
        }
        next();
    }catch(error){
        console.log("error in adminMid",error);
        return res.status(401).json({ errors: "Unauthorized access4" });
    }
}

module.exports = adminMid;