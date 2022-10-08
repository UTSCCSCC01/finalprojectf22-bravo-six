const asyncHandler = require('express-async-handler');
const User = require("../models/User");


const clearUsers = asyncHandler(async(req, res) =>{
    User.deleteMany({}, (err) =>{
        if(err){
            res.status(400).send("Unable to delete");
        }
        else{
            res.status(200).send("Cleared database");
        }
    });
});

module.exports = {clearUsers}