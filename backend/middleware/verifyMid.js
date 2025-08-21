const jwt = require("jsonwebtoken");
const config = require("../config");
const userModel = require("../models/user.model");

const verifyMid = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ errors: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "null") {
        return res.status(401).json({ errors: "Unauthorized access" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ errors: "Unauthorized access" });
        }

        req.userId = decoded.id;

        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ errors: "User not found" });
        }
    } catch (error) {
        await res.clearCookie("jwt");
        console.log("error in verifyMid:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ errors: "Token expired, please login again" });
        }

        return res.status(401).json({ errors: "Unauthorized access" });
    }
};

module.exports = verifyMid;
