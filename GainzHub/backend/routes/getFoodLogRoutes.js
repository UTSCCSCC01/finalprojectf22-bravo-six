const express = require('express');
const router = express.Router();

const { getFoodLog } = require('../controllers/getFoodLogController');
const { JWTAuth } = require('../middleware/JWTAuth');

router.get("/getFoodLog", JWTAuth, getFoodLog);

module.exports = (router);