const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const BodyWeight = require("../models/BodyWeight");
const BMI = require("../models/BMI");
const BF = require("../models/BF");
const { json } = require('express');

const addBodyWeight = asyncHandler(async(req, res) => {
    const userId = req.user;
    const {newBodyWeight} = req.body;
    try{
        const bodyWeightObj = new BodyWeight(newBodyWeight);
        bodyWeightObj.userId = userId;
        bodyWeightObj.save();
        return res.status(200).send("Added Body Weight");
    }catch(err){
        return res.status(400).send(err.message);
    }
});


const getBodyWeight = async(req, res) =>{
    const userId = req.user;
    const foundPlan = await BodyWeight.find({userId: userId});
    return res.status(200).json(foundPlan);

}

const getIndividualBodyWeight = async(req, res) => {
    const bodyWeightId = req.query['bodyWeightId'];
    try{
        const foundBodyWeight = await BodyWeight.findOne({_id:bodyWeightId});
        return res.status(200).json(foundBodyWeight);
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const addBMI = asyncHandler(async(req, res) => {
    const userId = req.user;
    const {newBMI} = req.body;
    try{
        const BMIObj = new BMI(newBMI);
        BMIObj.userId = userId;
        BMIObj.save();
        return res.status(200).send("Added BMI");
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const getBMI = async(req, res) =>{
    const userId = req.user;
    const foundPlan = await BMI.find({userId: userId});
    return res.status(200).json(foundPlan);

}

const getIndividualBMI = async(req, res) => {
    const BIMid = req.query['BMIid'];
    try{
        const foundBodyWeight = await BMI.findOne({_id:BIMid});
        return res.status(200).json(foundBodyWeight);
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const addBF = asyncHandler(async(req, res) => {
    const userId = req.user;
    const {newBF} = req.body;
    try{
        const BFObj = new BF(newBF);
        BFObj.userId = userId;
        BFObj.save();
        return res.status(200).send("Added BF");
    }catch(err){
        return res.status(400).send(err.message);
    }
});

const getBF = async(req, res) =>{
    const userId = req.user;
    const foundPlan = await BF.find({userId: userId});
    return res.status(200).json(foundPlan);

}

const getIndividualBF = async(req, res) => {
    const BFid = req.query['BFid'];
    try{
        const foundBF = await BF.findOne({_id:BFid});
        return res.status(200).json(foundBF);
    }catch(err){
        return res.status(400).send(err.message);
    }
}
const privateBodyWeight = async(req, res) => {
    const {mealPlanId} = req.body
    try{
        await BodyWeight.findOneAndUpdate({_id: mealPlanId}, {$set:{private: true}});
        return res.status(200).send("Meal Plan Now Private");
    }catch(err){
        return res.status(400).send(err.message);
    }
}

const unPrivateBodyWeight = async(req, res) => {
    const {mealPlanId} = req.body
    try{
        await BodyWeight.findOneAndUpdate({_id: mealPlanId}, {$set:{private: false}});
        return res.status(200).send("Meal Plan Now Public");
    }catch(err){
        return res.status(400).send(err.message);
    }
}

module.exports = {privateBodyWeight, unPrivateBodyWeight, addBodyWeight, getBodyWeight, getIndividualBodyWeight, addBMI, getIndividualBMI, getBMI, addBF, getBF, getIndividualBF};