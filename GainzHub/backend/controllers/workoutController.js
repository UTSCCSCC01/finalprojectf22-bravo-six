const jwt = require('jsonwebtoken');
const {check, validationResult, Result} = require('express-validator');
const asyncHandler = require('express-async-handler');
const Workouts = require("../models/Workouts")
const { json } = require('express');
const WorkoutPlan = require('../models/WorkoutPlan');

const searchWorkouts = asyncHandler(async(req, res)=>{
    const query = req.query.query
    try{
        const result = await Workouts.find({$text:{$search: query}})
        return res.status(200).json(result);
    }catch(err){
        return res.status(400).send(err.message);
    }
})

const getWorkout = asyncHandler(async(req, res)=>{
    const {workoutId} = req.query;
    try{
        const result = await Workouts.findOne({_id: workoutId});
        return res.status(200).json(result);
    }catch(err){
        return res.status(400).send(err.message);
    }
})

const addWorkoutPlanToCollection = asyncHandler(async(req, res)=>{
    const user = req.user;
    const {planName, description, workouts} = req.body;
    console.log(description);
    if(!planName || !description || !workouts){
        return res.status(400).send("Incorrect input format");
    }

    try{
        const newWorkoutPlan = await WorkoutPlan.create({
            planName,
            description,
            workouts
        });
        return res.status(200).send("Workout added");
    }catch(err){
        return res.status(500).send("Could not add workout plan");
    }
})

module.exports = {searchWorkouts, getWorkout, addWorkoutPlanToCollection};