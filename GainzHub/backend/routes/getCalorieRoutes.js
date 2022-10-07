const express = require('express');
const router = express.Router();

const {getCalorieGoal} = require("../controllers/getCalorieController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getCalorieGoal", JWTAuth, getCalorieGoal);

module.exports = (router);