const express = require("express");
const shipmentsRouter = express.Router();
const {
    getShipments,
    postShipment,
    getShipment,
    getSender,
    getReceiver,
    postSender,
} = require("../controllers/shipmentsController");

shipmentsRouter.route("/").get(getShipments).post(postShipment);

shipmentsRouter.route("/:shipment_id").get(getShipment);

shipmentsRouter.route("/:shipment_id/sender").get(getSender);

shipmentsRouter.route("/:shipment_id/receiver").get(getReceiver);

module.exports = shipmentsRouter;
