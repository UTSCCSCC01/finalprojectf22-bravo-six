const express = require('express');
const router = express.Router();

const {registerUser, checkRegister, checkLogin, loginUser} = require('../controllers/authController');

router.post("/", checkRegister, registerUser);
router.post("/login", checkLogin, loginUser);
router.put("/updateUserField");

module.exports = (router);