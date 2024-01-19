const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')

const errorMiddleware = require('./middleware/error')

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: 'Backend/config/config.env' })
}

//Route Imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')

app.use(express.json({ limit: '5mb' })) //body parser for request body undefined
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)

// Cors
const corsOptions ={
    origin:'https://ecommerce-backend-vemg.onrender.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../frontend//build")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend//build/index.html"))
})

//middleware for Errors
app.use(errorMiddleware)

module.exports = app