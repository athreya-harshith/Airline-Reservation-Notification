const dotenv = require('dotenv');// this returns an object 
dotenv.config();//Loads .env file contents into process.env by default.

module.exports = {
    PORT:process.env.PORT,
    GMAIL_PASS:process.env.GMAIL_PASS,
    GMAIL_EMAIL:process.env.GMAIL_EMAIL
};