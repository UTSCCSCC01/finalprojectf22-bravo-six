const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const { json } = require('express');

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

module.exports = {getPersonalMealPlans}