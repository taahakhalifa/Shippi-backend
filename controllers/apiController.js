const { endPointsJSONData } = require("../models/apiModel");

function endPointsJSON(req, res, next) {
    endPointsJSONData()
        .then((endpoints) => {
            res.status(200).send({ endpoints });
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = { endPointsJSON };
