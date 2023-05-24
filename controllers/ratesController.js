const { fetchAllRates } = require("../models/ratesModel");

function getRates(req, res, next) {
    fetchAllRates()
        .then((rates) => {
            res.status(200).send(rates);
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    getRates,
};
