const Workout = require("../models/workoutModel");
const mongoose = require('mongoose')
// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such workout'})
  }

  const singleWorkout = await Workout.findById(id);

  if (!singleWorkout) {
    res.status(404).json({ error: "No workout found" });
  } else {
    res.status(200).json(singleWorkout);
  }
};

// create new workout
const createWorkout = async (req, res) => {
    const { title, reps, weight } = req.body;
  
    // Add workout to database
    try {
      const workout = await Workout.create({ title, reps, weight });
      res.status(200).json(workout); // Send the response only once
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// delete a workout

const deleteWorkout = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})
    
    if (!workout) {
        res.status(404).json({ error: "No workout found" });
      } else {
        res.status(200).json(workout);
      }

};

//deletes ALL workouts 

const deleteAllWorkouts = async (req, res) => {
    try {
      const result = await Workout.deleteMany({}); // Deletes all documents in the collection
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "No workouts found to delete" });
      }
  
      res.status(200).json({ message: `${result.deletedCount} workouts deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting workouts" });
    }
  };
  

// update a workout


const updateWorkout = async(req,res) => {
    
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })
    
    if (!workout) {
        res.status(404).json({ error: "No workout found" });
      } else {
        res.status(200).json(workout);
      }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  deleteAllWorkouts,
  updateWorkout
};
