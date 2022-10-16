const express = require('express');
const router = express.Router();

const { getPersonalMealPlans } = require('../controllers/getPersonalMealPlansController');
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getPersonalMealPlans", JWTAuth, getPersonalMealPlans);

module.exports = (router);