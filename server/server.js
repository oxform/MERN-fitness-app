
require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")
const workoutRoutes = require('./routes/workouts')

//express app init
const app = express()

//middle ware function
//checks if there is a body message to perform a request on
app.use(express.json())

app.use((req, res, next) => {
console.log(req.path, req.method)
next()
})

app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests once connected to db 
        app.listen(process.env.PORT,()=>{
            console.log('Connected to database, currently listening on port 4000');
        })
    })
    .catch((error)=> {
        console.log(error)
    })




