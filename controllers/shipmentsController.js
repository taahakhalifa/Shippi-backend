const {
    fetchAllShipments,
    insertShipment,
    fetchShipment,
    fetchSender,
    fetchReceiver,
    insertSender,
    insertReceiver,
} = require("../models/shipmentsModel");

function getShipments(req, res, next) {
    fetchAllShipments()
        .then((shipments) => {
            res.status(200).send(shipments);
        })
        .catch((err) => {
            next(err);
        });
}

function postShipment(req, res, next) {
    const { shipment, sender, receiver } = req.body;

    insertShipment(shipment)
        .then((newShipment) => {
            return Promise.all([
                insertSender(newShipment.shipment_id, sender),
                insertReceiver(newShipment.shipment_id, receiver),
            ]).then(([newSender, newReceiver]) => {
                res.status(201).send({
                    shipment: newShipment,
                    sender: newSender,
                    receiver: newReceiver,
                });
            });
        })
        .catch((err) => {
            next(err);
        });
}

function getShipment(req, res, next) {
    const { shipment_id } = req.params;

    fetchShipment(shipment_id)
        .then((shipment) => {
            res.status(200).send(shipment);
        })
        .catch((err) => {
            next(err);
        });
}

function getSender(req, res, next) {
    const { shipment_id } = req.params;

    fetchSender(shipment_id)
        .then((sender) => {
            res.status(200).send(sender);
        })
        .catch((err) => {
            next(err);
        });
}

function getReceiver(req, res, next) {
    const { shipment_id } = req.params;

    fetchReceiver(shipment_id)
        .then((receiver) => {
            res.status(200).send(receiver);
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getShipments,
    postShipment,
    getShipment,
    getSender,
    getReceiver,
};
