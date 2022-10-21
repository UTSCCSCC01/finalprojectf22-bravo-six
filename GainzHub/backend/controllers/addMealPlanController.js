const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");

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

module.exports = {addMealPlan}