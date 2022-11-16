const express = require('express');
const {getAllUserData, getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure, getProfilePic, getUserBio, getUserFirstName, getUserLastName, editProfile, uploadProfilePic } = require('../controllers/userController');
const { JWTAuth } = require('../middleware/JWTAuth');
const router = express.Router();

router.get("/getUser", getUserData);
router.get("/getAllUser", getAllUserData);
router.get("/getUserSecure", JWTAuth, getUserDataSecure);
router.patch("/removeAddedPlan", JWTAuth, removeAddedMealPlan);
router.patch("/addExplorePlan", JWTAuth, addPublishedMealPlan);
router.put("/editProfile", editProfile);
router.post("/uploadProfilePic", JWTAuth, uploadProfilePic);
router.post("/getProfilePicture", JWTAuth, getProfilePic);

module.exports = (router);