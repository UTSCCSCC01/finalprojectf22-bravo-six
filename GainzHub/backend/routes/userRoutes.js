const express = require('express');
const { getUserData } = require('../controllers/userController');
const { JWTAuth } = require('../middleware/JWTAuth');
const router = express.Router();

router.get("/getUser", getUserData);

module.exports = (router);