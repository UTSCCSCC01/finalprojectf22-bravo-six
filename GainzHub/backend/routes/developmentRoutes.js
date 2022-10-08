const express = require('express');
const { verifyPassword } = require('../middleware/devAuth');
const router = express.Router();
const {clearUsers} = require('../controllers/devControllers');

router.delete("/clearUsers", verifyPassword, clearUsers);

module.exports = (router);