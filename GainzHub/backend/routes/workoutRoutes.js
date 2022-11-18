const express = require('express');
const { searchWorkouts, 
    getWorkout, 
    addWorkoutPlanToCollection, 
    getWorkoutPlans, 
    getPublishedWorkoutPlans, 
    publishWorkoutPlan, 
    unpublishWorkoutPlan,
    privateWorkout,
    unPrivateWorkout,
    getPrivate,
    getWorkoutPlan} = require('../controllers/workoutController');
const { searchWorkouts, getWorkout, addWorkoutPlanToCollection, getWorkoutPlans, getPublishedWorkoutPlans, publishWorkoutPlan, unpublishWorkoutPlan, getWorkoutPlan} = require('../controllers/workoutController');
const router = express.Router();
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/searchWorkouts", searchWorkouts);
router.get("/getWorkout", getWorkout);
router.post("/addWorkoutPlan", JWTAuth, addWorkoutPlanToCollection);
router.get("/getWorkoutPlans", JWTAuth, getWorkoutPlans);
router.patch("/privateWorkout", privateWorkout);
router.patch("/unPrivateWorkout", unPrivateWorkout);
router.get("/getPrivate", getPrivate);
router.get("/getPublishedWorkoutPlans", getPublishedWorkoutPlans);
router.patch("/publishWorkoutPlan", publishWorkoutPlan);
router.patch("/unpublishWorkoutPlan", unpublishWorkoutPlan);
router.get("/getWorkoutPlan", JWTAuth, getWorkoutPlan);

module.exports = (router);