const mongoose = require('mongoose')
const config=require(__base+'system/config.js')
/* Mongoose connection */
mongoose.connect(config.details.database.url)

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error")); //DB Connection fail

db.once("createConnection", () => {
    console.log("MongoDB Connection Succeeded") //DB connection success
})
//Mongoose connection settings over
module.exports=mongoose