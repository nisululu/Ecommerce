const mongoose = require('mongoose')

const connectDB = () =>{
    mongoose.connect(process.env.DB_URI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(()=>console.log("Database connected"))
}

module.exports = connectDB

