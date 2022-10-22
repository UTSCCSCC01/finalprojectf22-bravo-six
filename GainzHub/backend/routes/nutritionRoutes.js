const express = require('express');
const router = express.Router();

const {getCalorieGoal, getCaloriesAte, getFoodLog, getMealPlan, publishMealPlan, unPublishMealPlan, logFood, addMealPlan, getPersonalMealPlans, changeCalorieGoal, getPublishedMealPlans} = require("../controllers/nutritionController");
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
router.get("/getMealPlan", getMealPlan);
router.get("/getPublishedMeals", getPublishedMealPlans);

module.exports = (router);