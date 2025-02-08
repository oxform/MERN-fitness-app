
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

const PORT = process.env.PORT || 4000; // Use Railway's PORT or default to 4000 locally

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to database, currently listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


const path = require('path');

// Your existing middleware and routes here

// Serve static files from the React frontend app in production
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});
}

app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

