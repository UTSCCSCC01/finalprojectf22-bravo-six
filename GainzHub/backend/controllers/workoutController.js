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
    if(!planName || !description || !workouts){
        return res.status(400).send("Incorrect input format");
    }

    try{
        const newWorkoutPlan = await WorkoutPlan.create({
            userId: user,
            planName,
            description,
            workouts
        });
        return res.status(200).send("Workout added");
    }catch(err){
        return res.status(500).send(err.message);
    }
})

const getWorkoutPlans = asyncHandler(async (req, res)=>{
    const user = req.user;

    try{
        const userWorkoutPlans = await WorkoutPlan.find({userId: user});
        return res.status(200).json(userWorkoutPlans);
    }catch(err){
        return res.status(500).send("Server error");
    }
});

const privateWorkout = async(req, res) => {
    const {mealPlanId} = req.body
    try{
        await WorkoutPlan.findOneAndUpdate({_id: mealPlanId}, {$set:{private: true}});
        return res.status(200).send("Meal Plan Now Private");
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const unPrivateWorkout = async(req, res) => {
    const {mealPlanId} = req.body
    try{
        await WorkoutPlan.findOneAndUpdate({_id: mealPlanId}, {$set:{private: false}});
        return res.status(200).send("Meal Plan Now Public");
    }catch(err){
        return res.status(400).send(err.message);
    }
}
// GET /workout/getPublishedWorkoutPlans 
const getPublishedWorkoutPlans = async(req, res) =>{
    try{
        const publishedWorkoutPlans = await WorkoutPlan.find({published: true});
        return res.status(200).json(publishedWorkoutPlans);
    } catch(err){
        return res.status(400).send(err.message);
    }
}

const getPrivate = async(req, res) => {
    const workoutPlanId = req.query['workoutPlanId'];
    console.log(workoutPlanId);
    try{
        const foundWorkout = await WorkoutPlan.findOne({_id: workoutPlanId});
        return res.status(200).json(foundWorkout);
    }catch(err){
        return res.status(400).send(err.message);
    }
}

// PATCH /workout/publishWorkoutPlan
const publishWorkoutPlan = async(req,res) => {
    const {workoutPlanID} = req.body.params;
    try{
        const result = await WorkoutPlan.findOneAndUpdate({_id: workoutPlanID}, {$set:{published: true}});
        return res.status(200).json("Workout Plan: Published");
    } catch(err){
        return res.status(400).send(err.message);
    }
}

// PATCH /workout/unpublishWorkoutPlan
const unpublishWorkoutPlan = async(req,res) => {
    const {workoutPlanID} = req.body.params;
    try{
        const result = await WorkoutPlan.findOneAndUpdate({_id: workoutPlanID}, {$set:{published: false}});
        return res.status(200).json("Workout Plan: Unpublished");
    } catch(err){
        return res.status(400).send(err.message);
    }
}

const getWorkoutPlan = async(req, res) => {
    const {workoutPlanID} = req.params;
    try{
        const result = await WorkoutPlan.findOne({_id: workoutPlanID});
        return res.status(200).json(result);
    } catch(err) {
        return res.status(400).send(err.message);
    }
}


module.exports = {
    searchWorkouts, 
    getWorkout,
    addWorkoutPlanToCollection, 
    getWorkoutPlans,
    getPublishedWorkoutPlans, 
    publishWorkoutPlan,
    unpublishWorkoutPlan,
    getPrivate,
    unPrivateWorkout,
    privateWorkout,
    getWorkoutPlan
}
