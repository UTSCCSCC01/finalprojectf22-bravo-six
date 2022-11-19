const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult, Result} = require('express-validator');
const asyncHandler = require('express-async-handler');
const SocialPost = require("../models/SocialPost");
let {s3DAO} = require("../config/awsS3");
s3DAO = new s3DAO();

const createPost = async(req, res)=>{
    const errors = validationResult(req);
    const user = req.user;
    const {PostMessage, image} = req.body;
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg}); //Return
    }
    
    try{
        const socialpost = new SocialPost({
            userId: user, 
            PostMessage
        });
        if(socialpost){
            socialpost.save(async function(err, saved){
                if(err) return res.status(500).send(err.message);

                //Add post image to s3 Bucket
                try{
                    await s3DAO.uploadPost(image, saved._id);
                    return res.status(200).json({
                        userId: socialpost.userId,
                        PostMessage: socialpost.PostMessage
                    })
                }catch(err){
                    return res.status(500).send(err.message);
                }

            });
        

        }
    }catch(error){
        return res.status(500).json({errors: error.message});
    }
};

const getAllPosts = async(req, res)=>{
    SocialPost.find({},(err,result) => {
        if (err)
        {
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    });
};

const getAllUserPosts = async(req, res)=>{
    const user = req.user;
    try{
        let posts = await SocialPost.find({userId: user}).lean();
        
        //Get the image associated with the posts
        for(let i = 0; i < posts.length; i++){
            const url = await s3DAO.getPostImage(posts[i]._id);
            posts[i].url = url;
        }
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).send(err.message);
    }

}

module.exports = {
    createPost,
    getAllPosts,
    getAllUserPosts
}