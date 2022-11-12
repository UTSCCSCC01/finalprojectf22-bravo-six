const express = require('express');
const { getAllUserData, getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure } = require('../controllers/userController');
const { JWTAuth } = require('../middleware/JWTAuth');
const router = express.Router();

router.get("/getUser", getUserData);
router.get("/getAllUser", getAllUserData);
router.get("/getUserSecure", JWTAuth, getUserDataSecure);
router.patch("/removeAddedPlan", JWTAuth, removeAddedMealPlan);
router.patch("/addExplorePlan", JWTAuth, addPublishedMealPlan);

module.exports = (router);