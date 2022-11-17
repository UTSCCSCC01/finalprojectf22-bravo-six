const express = require('express');
const router = express.Router();
const {createPost , getAllPosts, getAllUserPosts } = require("../controllers/socialController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/post", JWTAuth, createPost);
router.get("/getAllPosts", getAllPosts);
router.post("/getAllUserPosts", JWTAuth, getAllUserPosts);

module.exports = (router);