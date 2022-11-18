const express = require('express');
<<<<<<< HEAD
const { removePublishedWorkoutPlan, addPublishedWorkoutPlan, getUserFromWorkoutPlan, getAllUserData, getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure, getProfilePic, editProfile, uploadProfilePic, getProfilePicOther, followUser, addFollower, unfollowUser, removeFollower } = require('../controllers/userController');
=======
const { getUserData, removeAddedMealPlan, addPublishedMealPlan, getUserDataSecure, getUserFromWorkoutPlan } = require('../controllers/userController');
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)
const { JWTAuth } = require('../middleware/JWTAuth');
const router = express.Router();

router.get("/getUser", getUserData);
router.get("/getAllUser", getAllUserData);
router.get("/getUserSecure", JWTAuth, getUserDataSecure);
router.patch("/removeAddedPlan", JWTAuth, removeAddedMealPlan);
router.patch("/addExplorePlan", JWTAuth, addPublishedMealPlan);
<<<<<<< HEAD
router.put("/editProfile", editProfile);
router.post("/uploadProfilePic", JWTAuth, uploadProfilePic);
router.post("/getProfilePicture", JWTAuth, getProfilePic);
router.post("/getProfilePictureOther", JWTAuth, getProfilePicOther);
router.post("/followUser", JWTAuth, followUser);
router.post("/addFollower", JWTAuth, addFollower);
router.post("/unfollowUser", JWTAuth, unfollowUser);
router.post("/removeFollower", JWTAuth, removeFollower);
router.get("/getUserFromWorkoutPlan", getUserFromWorkoutPlan);
router.patch("/addPublishedWorkoutPlan", JWTAuth, addPublishedWorkoutPlan);
router.patch("/removePublishedWorkoutPlan", JWTAuth, removePublishedWorkoutPlan);
=======
router.get("/getUserFromWorkoutPlan", getUserFromWorkoutPlan);
>>>>>>> deef618 (BRAV-11 Completed Workout Explore)

module.exports = (router);