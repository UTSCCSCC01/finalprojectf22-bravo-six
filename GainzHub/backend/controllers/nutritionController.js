const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const MealPlan = require("../models/MealPlan");
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

const getCaloriesAte = async(req, res) => {
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
    
    try{
        const mealPlanObj = new MealPlan(newMealPlan);
        mealPlanObj.userId = userId;
        mealPlanObj.save();
        return res.status(200).send("Added meal");
    }catch(err){
        return res.status(400).send(err.message);
    }
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

const getMealPlan = async(req, res) => {
    const mealPlanId = req.query['mealPlanId'];
    try{
        const foundMealPlan = await MealPlan.findOne({_id:mealPlanId});
        return res.status(200).json(foundMealPlan);
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const getPublishedMealPlans = async(req, res) =>{
    try{
        const publishedMealPlans = await MealPlan.find({published: true});
        return res.status(200).json(publishedMealPlans);
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const publishMealPlan = async(req, res) => {
    const {mealPlanId} = req.body
    try{
        //Flip the published boolean currently in the object
        await MealPlan.findOneAndUpdate({_id: mealPlanId}, {$set:{published: true}});
        return res.status(200).send("Updated Meal Plan");
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const unPublishMealPlan = async(req, res) => {
    const {mealPlanId} = req.body
    try{
        //Flip the published boolean currently in the object
        await MealPlan.findOneAndUpdate({_id: mealPlanId}, {$set:{published: false}});
        return res.status(200).send("Updated Meal Plan");
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const getPersonalMealPlans = async(req, res) =>{
    const userId = req.user;

    const foundPlan = await MealPlan.find({userId: userId});
    return res.status(200).json(foundPlan);

}

const editMealPlan = async(req, res) => {
    const {updatedMealPlan} = req.body;
    try{
        await MealPlan.findOneAndReplace({_id: updatedMealPlan._id}, updatedMealPlan);
        return res.status(200).send("Updated Meal");
    } catch(err){
        return res.status(400).send(err.message);
    }

}


module.exports = {getFoodLog, logFood, getMealPlan, getPublishedMealPlans, getCalorieGoal, getCaloriesAte, addMealPlan, changeCalorieGoal, publishMealPlan, unPublishMealPlan, getPersonalMealPlans, editMealPlan}