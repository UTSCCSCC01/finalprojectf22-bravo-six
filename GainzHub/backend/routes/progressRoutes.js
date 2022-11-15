const express = require('express');
const router = express.Router();
const {addBodyWeight, getBodyWeight, getIndividualBodyWeight, addBMI, getBMI, getIndividualBMI, addBF, getBF, getIndividualBF} = require("../controllers/progressController");
const { JWTAuth } = require('../middleware/JWTAuth');

router.post("/addBodyWeight", JWTAuth, addBodyWeight);
router.get("/getUserBodyWeights", JWTAuth, getBodyWeight);
router.get("/getBodyWeights", getIndividualBodyWeight);
router.post("/addBMI", JWTAuth, addBMI);
router.get("/getUserBMIs", JWTAuth, getBMI);
router.get("/getBMI", getIndividualBMI);
router.post("/addBF", JWTAuth, addBF);
router.get("/getUserBFs", JWTAuth, getBF);
router.get("/getBF", getIndividualBF);
module.exports = (router);