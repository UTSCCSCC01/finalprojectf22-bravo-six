const express = require('express');
const router = express.Router();

const {changeLastName} = require("../controllers/changeLNController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/changeLastName", JWTAuth, changeLastName);


module.exports = (router);