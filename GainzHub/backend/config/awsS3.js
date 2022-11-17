const { S3 } = require('aws-sdk');
const AWS = require('aws-sdk');
const fs = require('fs');



function s3DAO (){}

const ID = "AKIA5VMO3VKYKGSGHGNY";
const SECRET = "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"

const PFP_BUCKET_NAME = "gainzhub-profilepics"

const SOCIAL_BUCKET_NAME = "gainzhub-user-posts";

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    signatureVersion: 'v4',
    region:'us-east-2'
});


const params = {
    Bucket: PFP_BUCKET_NAME,
    CreateBucketConfiguration:{
        //Set your region
        LocationConstraint: "us-west-2"
    }
};

const socialParams = {
    Bucket: SOCIAL_BUCKET_NAME,
    CreateBucketConfiguration:{
        LocationConstraint: "us-west-2"
    }
}


//Only needs to be called once
//This bucket will contain profile picture
const createBucketProfilePictureBucket = () =>{
    s3.createBucket(params, function(err, data){
        if(err) console.log(err, err.stack);
        else console.log("Bucket created sucessfully", data.Location);
    });
}

//Only needs to be called once
//Create the social bucket which will contain user image posts
const createSocialBucket = () => {
    s3.createBucket(socialParams, function(err, data){
        if(err) console.log(err, err.stack);
        else console.log("Bucket created sucessfully", data.Location);
    });
}

s3DAO.prototype.uploadProfilePicture = function(fileContent64, imageName){
    return new Promise((resolve, reject) => {
        const buffer = Buffer.from(fileContent64.replace(/^data:image\/\w+;base64,/, ""),'base64');

        const params = {
            Bucket: PFP_BUCKET_NAME,
            Key: `${imageName}.jpg`,
            Body: buffer,
        }
    
        s3.upload(params, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve("Success");
            }
        })
    })

}

s3DAO.prototype.getProfilePicture = function(username){
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: PFP_BUCKET_NAME,
            Key: `${username}.jpg`,
        }

        s3.headObject(params, function(err, metadata){
            if(err && err.name == "NotFound"){
                console.log("Could not find Object")
                resolve("");
            }else if (err){
                console.log(err);
                resolve("");
            }
            else{
                params.Expires = 86400;
                s3.getSignedUrl('getObject', params, (err, url)=>{
                    if(err) reject(err);
                    resolve(url);
                })
            }
        })
    })
}

s3DAO.prototype.uploadPost = function(fileContent64, postId) {
    return new Promise((resolve, reject) => { 
        const buffer = Buffer.from(fileContent64.replace(/^data:image\/\w+;base64,/, ""),'base64');
        const params = {
            Bucket: SOCIAL_BUCKET_NAME,
            Key: `${postId}.jpg`,
            Body: buffer,
        }

        s3.upload(params, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve("Success");
            }
        })
    });
}

s3DAO.prototype.getPostImage = function(postId){
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: SOCIAL_BUCKET_NAME,
            Key: `${postId}.jpg`,
        }

        s3.headObject(params, function(err, metadata){
            if(err && err.name == "NotFound"){
                console.log("Could not find Object")
                resolve("");
            }else if (err){
                console.log(err);
                resolve("");
            }
            else{
                params.Expires = 86400;
                s3.getSignedUrl('getObject', params, (err, url)=>{
                    if(err) reject(err);
                    resolve(url);
                })
            }
        })
    })
}

module.exports = {createBucketProfilePictureBucket, createSocialBucket, s3DAO};
