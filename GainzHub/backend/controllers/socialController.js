const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult, Result} = require('express-validator');
const asyncHandler = require('express-async-handler');
const SocialPost = require("../models/SocialPost");

const CreatePost = async(req, res)=>{
    const errors = validationResult(req);
    console.log(req.user);
    const {userId, PostMessage} = req.body;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg}); //Return
    }
    
    try{
        const socialpost = new SocialPost({
            userId, 
            PostMessage
        });
        if(socialpost){
            await socialpost.save();
            return res.status(200).json({
                userId: socialpost.userId,
                PostMessage: socialpost.PostMessage
            })
        }
    }catch(error){
        return res.status(500).json({errors: error.message});
    }
};

const GetPost = async(req, res)=>{
    SocialPost.find({},(err,result) => {
        if (err)
        {
            res.json(err);
        } else {
            res.json(result);
        }
    });
};
 
module.exports = {
    CreatePost,
    GetPost
}