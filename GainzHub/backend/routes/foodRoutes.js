const express = require('express');
const router = express.Router();

const {getCalorieGoal, getCaloriesAte, getFoodLog, logFood} = require("../controllers/foodController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getCalorieGoal", JWTAuth, getCalorieGoal);
router.get("/getCaloriesAte", JWTAuth, getCaloriesAte);
router.get("/getFoodLog", JWTAuth, getFoodLog);
router.post("/logFood", JWTAuth, logFood);

module.exports = (router);