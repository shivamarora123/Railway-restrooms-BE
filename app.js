const bodyParser = require('body-parser')
//const mongoose = require('mongoose')

const express=require('express')
const morgan=require('morgan')



/* Global Path setup for easy require */
global.__base = __dirname + '/'

/*Mongo DB Connection */
const mongodb=require(__base+'system/mongodb.js')

const config = require(__base + 'system/config.js')

const app=express()


app.use(bodyParser.urlencoded({
    extended:true,

}))


app.use(morgan('combined')))
/* Global Cross-Origin Access */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
})


/* Important Page routes */
const auth=require(__base+ 'routes/auth.js')
const basic=require(__base +'routes/basic.js')
/* Active Page Routes */
app.use('/auth',auth)
app.use('/',basic)


module.exports=app