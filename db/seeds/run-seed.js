const shipmentsData = require("../data/development-data/shipmentsData.js");
const shippingData = require("../data/development-data/shippingData.js");
const sendersData = require("../data/development-data/sendersData.js");
const receiversData = require("../data/development-data/receiversData.js");
const seed = require("./seed.js");
const db = require("../connection.js");

const runSeed = () => {
    return seed({
        shipmentsData,
        shippingData,
        sendersData,
        receiversData,
    }).then(() => db.end());
};

runSeed();
