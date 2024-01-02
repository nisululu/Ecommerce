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

dotenv.config({ path: 'backend/config/config.env' })

connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.api_key,
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