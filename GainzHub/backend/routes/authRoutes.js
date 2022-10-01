const express = require('express');
const router = express.Router();

const {registerUser, checkRegister} = require('../controllers/authController');

router.post("/", registerUser)

module.exports = (router);