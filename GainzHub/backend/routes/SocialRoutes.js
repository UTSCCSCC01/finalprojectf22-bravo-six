const express = require('express');
const router = express.Router();
const {CreatePost , GetPost } = require("../controllers/socialController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/post", CreatePost);
router.get("/getpost", GetPost);

module.exports = (router);