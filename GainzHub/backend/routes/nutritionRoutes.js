const express = require('express');
const router = express.Router();

const {getCalorieGoal, getCaloriesAte, getFoodLog, logFood, addMealPlan, getPersonalMealPlans, changeCalorieGoal} = require("../controllers/nutritionController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getCalorieGoal", JWTAuth, getCalorieGoal);
router.get("/getCaloriesAte", JWTAuth, getCaloriesAte);
router.get("/getFoodLog", JWTAuth, getFoodLog);
router.post("/logFood", JWTAuth, logFood);
router.post("/addPersonalMealPlan", JWTAuth, addMealPlan);
router.get("/getPersonalMealPlans", JWTAuth, getPersonalMealPlans);
router.post("/changeCalorieGoal", JWTAuth, changeCalorieGoal);

module.exports = (router);