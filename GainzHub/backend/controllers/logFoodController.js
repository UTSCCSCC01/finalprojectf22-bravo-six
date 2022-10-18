const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");

const logFood = async(req, res) =>{
    const userId = req.user;
    const {newFood} = req.body;

    User.findOneAndUpdate({_id: userId}, {$push:{food: newFood}}, {$inc:{caloriesAte: newFood.foodCalories}}, (err)=>{
        if(err){
            return res.status(400).json({error: "Cant update"});
        }
        else{
            return res.status(200).json({message: "Success", food: newFood});
        }
    });
}

module.exports = {logFood}