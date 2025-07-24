const dotenv = require('dotenv');
dotenv.config()

const user = process.env.USERJWT;
const admin = process.env.ADMINJWT;

const config = {
  JWT_ADMIN_PASSWORD:admin,
  JWT_USER_PASSWORD:user
};

module.exports = config;