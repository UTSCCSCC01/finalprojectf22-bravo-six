const jwt = require('jsonwebtoken');
const {check, validationResult, Result} = require('express-validator');
const asyncHandler = require('express-async-handler');
const Workouts = require("../models/Workouts")
const { json } = require('express');

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

module.exports = {searchWorkouts, getWorkout};