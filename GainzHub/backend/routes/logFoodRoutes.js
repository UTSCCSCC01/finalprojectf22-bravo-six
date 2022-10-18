const express = require('express');
const router = express.Router();

const { logFood } = require('../controllers/logFoodController');
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/logFood", JWTAuth, logFood);


module.exports = (router);