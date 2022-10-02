const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User");

const checkLogin= [
    check('email', 'Please include a valid email').isEmail(), //Check if the 'email' field is formatted like an email
    check('password', 'Please include a password with 8 or more characters').isLength({ min: 8})] //Check if 'password' field had 8

const checkRegister = [
    check('firstName', 'Please include a firstname').not().isEmpty(), //Check if the 'user' field exists or if its empty
    check('lastName', 'Please include a lastname').not().isEmpty(), //Check if the 'user' field exists or if its empty
    check('email', 'Please include a valid email').isEmail(), //Check if the 'email' field is formatted like an email
    check('password', 'Please include a password with 8 or more characters').isLength({ min: 8})] //Check if 'password' field had 8

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const loginUser = asyncHandler(async(req, res) => {
    const errors = validationResult(req);

    //Check if there are errors
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()[0].msg});
    }
    
    const {email, password} = req.body;
    try{
        //Get the user with the provided email
        const userExists = await User.findOne({email});

        //First check if the user exists
        if(!userExists){
            return res.status(400).json({errors: 'Invalid Credentials'});
        }

        //Compare password in database to password input
        if(await bcrypt.compare(password, userExists.password)){
            return res.status(200).json({
                _id: userExists._id,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                email: userExists.email,
                token: generateToken(userExists._id)
            });
        }
        else{
            return res.status(400).json({errors: 'Invalid Credentials'});
        }

    }catch(error){
        return res.status(500).json({errors: error.message});
    }
});


const registerUser = asyncHandler(async(req, res)=>{
    const errors = validationResult(req); //What were the validation results from the checks?
    const {firstName, lastName ,email, password} = req.body;
    
    //Check if errors is not empty
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg}); //Return
    }
    
    try{
        //Check if the user already exists
        const userExists = await User.findOne({email}); //Find one user with {email: email} (shorthand {email})
        if(userExists){
            return res.status(400).json({errors:"User already exists"});
        }
        
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create a user object
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        
        if(user){
            await user.save();
            return res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
        }
    }catch(error){
        return res.status(500).json({errors: error.message});
    }
});

module.exports = {
    registerUser,
    loginUser,
    checkRegister,
    checkLogin,
}