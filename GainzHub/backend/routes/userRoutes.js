const express = require('express');
const { getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure, getUserBio, getUserFirstName, getUserLastName, editProfile } = require('../controllers/userController');
const { JWTAuth } = require('../middleware/JWTAuth');
const router = express.Router();

router.get("/getUser", getUserData);
router.get("/getUserSecure", JWTAuth, getUserDataSecure);
router.patch("/removeAddedPlan", JWTAuth, removeAddedMealPlan);
router.patch("/addExplorePlan", JWTAuth, addPublishedMealPlan);
router.put("/editProfile", editProfile);

module.exports = (router);