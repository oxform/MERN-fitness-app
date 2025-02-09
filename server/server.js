require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const path = require('path')
const workoutRoutes = require('./routes/workouts')

// express app init
const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API routes
app.use('/api/workouts', workoutRoutes)

// Health check - now checks DB connection status
app.get('/api/health', (req, res) => {
    console.log('Health check hit, DB state:', mongoose.connection.readyState)
    // Return OK even if DB isn't connected yet
    res.status(200).json({
        status: 'OK',
        dbState: mongoose.connection.readyState
    })
})

// Static file serving in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../frontend/build');
    console.log('Serving React from:', buildPath);

    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'), (err) => {
            if (err) {
                console.error('Error serving index.html:', err);
                res.status(500).send('Error loading index.html');
            }
        });
    });
}

// Start server immediately
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

// Connect to database after server is running
mongoose.connect(process.env.MONGODB_URL || process.env.MONG_URI)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log('Database connection error:', error)
    })

// Handle server shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received')
    server.close(() => {
        mongoose.connection.close()
    })
})