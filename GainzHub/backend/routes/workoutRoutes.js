const express = require('express');
const { searchWorkouts, getWorkout } = require('../controllers/workoutController');
const router = express.Router();

router.get("/searchWorkouts", searchWorkouts);
router.get("/getWorkout", getWorkout);

module.exports = (router);