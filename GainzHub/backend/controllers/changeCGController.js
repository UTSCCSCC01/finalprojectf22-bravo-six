const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");

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

module.exports = {changeCalorieGoal}