const express = require('express');
const router = express.Router();

const {addMealPlan} = require("../controllers/addMealPlanController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/addPersonalMealPlan", JWTAuth, addMealPlan);


module.exports = (router);