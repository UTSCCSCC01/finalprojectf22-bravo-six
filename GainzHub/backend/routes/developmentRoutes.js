const express = require('express');
const { verifyPassword } = require('../middleware/devAuth');
const router = express.Router();
const {clearUsers, clearMeals} = require('../controllers/devControllers');

router.delete("/clearUsers", verifyPassword, clearUsers);

router.delete("/clearMeals", verifyPassword, clearMeals);

module.exports = (router);