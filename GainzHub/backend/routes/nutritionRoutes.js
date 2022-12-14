const express = require('express');
const router = express.Router();

const {unPrivateMealPlan, privateMealPlan, getCalorieGoal, getCaloriesAte, getFoodLog, getMealPlan, publishMealPlan, unPublishMealPlan, logFood, addMealPlan, getPersonalMealPlans, changeCalorieGoal, getPublishedMealPlans, editMealPlan, editReview, deleteMealPlan} = require("../controllers/nutritionController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getCalorieGoal", JWTAuth, getCalorieGoal);
router.get("/getCaloriesAte", JWTAuth, getCaloriesAte);
router.get("/getFoodLog", JWTAuth, getFoodLog);
router.post("/logFood", JWTAuth, logFood);
router.post("/addPersonalMealPlan", JWTAuth, addMealPlan);
router.get("/getPersonalMealPlans", JWTAuth, getPersonalMealPlans);
router.post("/changeCalorieGoal", JWTAuth, changeCalorieGoal);
router.patch("/publishMealPlan", publishMealPlan);
router.patch("/unPublishMealPlan", unPublishMealPlan);
router.patch("/privateMealPlan", privateMealPlan);
router.patch("/unPrivateMealPlan", unPrivateMealPlan);
router.get("/getMealPlan", getMealPlan);
router.get("/getPublishedMeals", getPublishedMealPlans);
router.put("/editMealPlan", JWTAuth, editMealPlan);
router.post("/editReview", JWTAuth, editReview);
router.post("/deleteMealPlan", JWTAuth, deleteMealPlan);

module.exports = (router);