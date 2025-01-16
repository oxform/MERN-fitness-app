
require('dotenv').config()
const express = require('express')

//express app init
const app = express()

//middle ware function
app.use((req, res, next) => {
console.log(req.path, req.method)
next()
})

//routes
app.get('/', (req,res) =>{
    res.json({message:'Welcome to the app'})
});

// listen for requests 
app.listen(process.env.PORT,()=>{
    console.log('listening on port 4000!!');
})

