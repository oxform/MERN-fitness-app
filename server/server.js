require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const path = require('path')
const workoutRoutes = require('./routes/workouts')

// express app init
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API routes
app.use('/api/workouts', workoutRoutes)
app.get('/api/health', (req, res) => {
    res.status(200).send('OK')
})

// Static file serving in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../frontend/build');
    console.log('Serving React from:', buildPath);  // Log to confirm the path

    app.use(express.static(buildPath));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'), (err) => {
            if (err) {
                console.error('Error serving index.html:', err);
                res.status(500).send('Error loading index.html');
            }
        });
    });
}

// Port configuration
const PORT = process.env.PORT || 4000

// Database connection and server start
mongoose.connect(process.env.MONGODB_URL || process.env.MONG_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to database, currently listening on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })