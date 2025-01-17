const mongoose = require('mongoose')

const Scehma = mongoose.Schema

const workoutSchema = new Scehma({
    title: {
        type: String,
        required: true
    },
    reps: {
        type:Number,
        required: true
    }, 
    weight: {
        type: Number,
        required: true
    }
}, { timestamps:true})

module.exports = mongoose.model('Workout', workoutSchema)