const express = require('express');
const router = express.Router();

const {getCalorieGoal, getCaloriesAte} = require("../controllers/getCalorieController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getCalorieGoal", JWTAuth, getCalorieGoal);
router.get("/getCaloriesAte", JWTAuth, getCaloriesAte);

module.exports = (router);