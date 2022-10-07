const express = require('express');
const router = express.Router();

const {changeCalorieGoal} = require("../controllers/changeCGController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/changeCalorieGoal", JWTAuth, changeCalorieGoal);


module.exports = (router);