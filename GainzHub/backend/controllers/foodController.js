const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const { json } = require('express');

const getFoodLog = async(req, res) =>{
    const userId = req.user;

    User.findOne({_id: userId},  (err, data)=>{
        if(err){
            return res.status(400).json({error: "Cant get value"});
        }
        else{
            if(data.food != null){
                return res.status(200).json({food: data.food});
            }
        }
    });
}

const logFood = async(req, res) =>{
    const userId = req.user;
    const {newFood} = req.body;
    console.log(userId)
    let test = await User.findById(userId);
    User.findOneAndUpdate({_id: userId}, {
                                        $inc:{caloriesAte: newFood.foodCalories},
                                        $push:{food: newFood}, 
                                        }, 
        (err)=>{
            if(err){
                return res.status(400).json({error: "Cant update"});
            }
            else{
                return res.status(200).json({message: "Success", food: newFood});
            }
        });
}

const getCalorieGoal = async(req, res) =>{
    const userId = req.user;

    User.findOne({_id: userId},  (err, data)=>{
        if(err){
            return res.status(400).json({error: "Cant get value"});
        }
        else{
            if(data.calorieGoal != null){
                return res.status(200).json({calorieGoal: data.calorieGoal});
            }
        }
    });
}

const getCaloriesAte = async(req, res) =>{
    const userId = req.user;

    User.findOne({_id: userId},  (err, data)=>{
        if(err){
            return res.status(400).json({error: "Cant get value"});
        }
        else{
            if(data.calorieGoal != null){
                return res.status(200).json({caloriesAte: data.caloriesAte});
            }
        }
    });
}

const addMealPlan = async(req, res) =>{
    const userId = req.user;
    const {newMealPlan} = req.body;

    User.updateOne({_id: userId}, {$push:{personalMealPlans: newMealPlan}}, (err)=>{
        if(err){
            return res.status(400).json({error: "Cant update"});
        }
        else{
            return res.status(200).json({message: "Success", personalMealPlans: newMealPlan});
        }
    });
}

const changeCalorieGoal = async(req, res) =>{
    const userId = req.user;
    const {newCalorieGoal} = req.body;

    User.updateOne({_id: userId}, {calorieGoal: newCalorieGoal}, (err)=>{
        if(err){
            return res.status(400).json({error: "Cant update"});
        }
        else{
            return res.status(200).json({message: "Success", calorieGoal: newCalorieGoal});
        }
    });
}

const getPersonalMealPlans = async(req, res) =>{
    const userId = req.user;

    User.findOne({_id: userId},  (err, data)=>{
        if(err){
            return res.status(400).json({error: "Cant get value"});
        }
        else{
            if(data.personalMealPlans != null){
                return res.status(200).json({personalMealPlans: data.personalMealPlans});
            }
        }
    });
}


module.exports = {getFoodLog, logFood, getCalorieGoal, getCaloriesAte, addMealPlan, changeCalorieGoal, getPersonalMealPlans}