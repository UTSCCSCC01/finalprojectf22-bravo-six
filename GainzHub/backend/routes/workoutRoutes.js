const express = require('express');
const { searchWorkouts, getWorkout, addWorkoutPlanToCollection } = require('../controllers/workoutController');
const router = express.Router();

router.get("/searchWorkouts", searchWorkouts);
router.get("/getWorkout", getWorkout);
router.post("/addWorkoutPlan", addWorkoutPlanToCollection);

module.exports = (router);