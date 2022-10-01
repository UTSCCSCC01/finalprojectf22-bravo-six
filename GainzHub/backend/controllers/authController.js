const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler');
const User = require("../models/User")

const checkLogin= [
    
]

const checkRegister = [
    check('name', 'Please include a name').not().isEmpty, //Check if the 'user' field exists or if its empty
    check('email', 'Please include a valid email').isEmail(), //Check if the 'email' field is formatted like an email
    check('password', 'Please include a password with 8 or more characters').isLength({ min: 8})] //Check if 'password' field had 8


const registerUser = asyncHandler(async( req, res)=>{
    const errors = validationResult(req); //What were the validation results from the checks?
    const {firstName, lastName,email, password} = req.body;
    console.log(firstName)
    //Check if errors is not empty
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); //Return
    }
    
    try{
        
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
        return res.status(500).send(error.message);
    }

});

module.exports = {
    registerUser,
    checkRegister,
}