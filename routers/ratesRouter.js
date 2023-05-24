const express = require("express");
const ratesRouter = express.Router();
const { getRates } = require("../controllers/ratesController");

ratesRouter.route("/").get(getRates);

module.exports = ratesRouter;
