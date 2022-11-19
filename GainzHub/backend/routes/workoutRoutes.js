const express = require('express');
const {getPrivate, unPrivateWorkout, privateWorkout, searchWorkouts, getWorkout, addWorkoutPlanToCollection, getWorkoutPlans } = require('../controllers/workoutController');
const router = express.Router();
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/searchWorkouts", searchWorkouts);
router.get("/getWorkout", getWorkout);
router.post("/addWorkoutPlan", JWTAuth, addWorkoutPlanToCollection);
router.get("/getWorkoutPlans", JWTAuth, getWorkoutPlans);
router.patch("/privateWorkout", privateWorkout);
router.patch("/unPrivateWorkout", unPrivateWorkout);
router.get("/getPrivate", getPrivate);

module.exports = (router);