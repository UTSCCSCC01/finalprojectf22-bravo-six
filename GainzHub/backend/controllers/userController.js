const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");
const MealPlan = require("../models/MealPlan");
const { json } = require('express');

const getUserData = asyncHandler(async(req, res) => {
    const user = req.user;
    try{
        const foundUser = await User.findOne({_id: user});
        return res.status(200).json(foundUser);
    }catch(err){
        return res.status(400).send(err.message);
    }

});

module.exports = {getUserData}