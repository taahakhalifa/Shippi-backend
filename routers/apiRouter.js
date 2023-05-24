const express = require("express");
const apiRouter = express.Router();
const shipmentsRouter = require("./shipmentsRouter");
const ratesRouter = require("./ratesRouter");
const { endPointsJSON } = require("../controllers/apiController");

apiRouter.route("/").get(endPointsJSON);

apiRouter.use("/shipments", shipmentsRouter);

apiRouter.use("/rates", ratesRouter);

module.exports = apiRouter;
