const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')
const cloudinary = require('cloudinary')

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

    process.exit(1)
})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: 'Backend/config/config.env' })
}

connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})

//unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})