const jwt = require('jsonwebtoken');
const {check, validationResult, Result} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const MealPlan = require("../models/MealPlan");
const { json } = require('express');

const getUserData = asyncHandler(async(req, res) => {
    const userId = req.headers['x-auth-token']; //Temporary workaround, massive security risk, please refactor later
    try{
        const foundUser = await User.findOne({_id: userId});
        return res.status(200).json(foundUser);
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const getAllUserData = asyncHandler(async(req, res) => {
    User.find({},(err,result) => {
        if (err)
        {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

const getUserDataSecure = asyncHandler(async(req, res) => {
    const userId = req.user; //Temporary workaround, massive security risk, please refactor later
    try{
        const foundUser = await User.findOne({_id: userId});
        return res.status(200).json(foundUser);
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const removeAddedMealPlan = asyncHandler(async(req, res)=>{
    const userId = req.user;
    const {mealPlanId} = req.body;
    try{
        const userObj = await User.findOne({_id:userId});
        userObj.exploreMealPlans= userObj.exploreMealPlans.filter((meal) => meal != mealPlanId);
        await userObj.save();
        res.status(200).send("Success unadding mealplan");
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const addPublishedMealPlan = asyncHandler( async(req, res)=>{
    const userId = req.user;
    const {mealPlanId} = req.body;
    console.log(mealPlanId);
    try{
        await User.updateOne({_id: userId}, {$push: {exploreMealPlans: mealPlanId}});
        res.status(200).send("Successfully added meal plan");
    }catch(err){
        return res.status(500).send(err.message);
    }
});

module.exports = {getAllUserData, getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure};