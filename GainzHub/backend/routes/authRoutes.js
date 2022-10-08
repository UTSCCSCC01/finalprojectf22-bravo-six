const express = require('express');
const router = express.Router();

const {registerUser, checkRegister, checkLogin, loginUser, CreateWorkout} = require('../controllers/authController');

router.post("/", checkRegister, registerUser);
router.post("/login", checkLogin, loginUser);

router.post("/CreateWorkouts", CreateWorkout);

module.exports = (router);