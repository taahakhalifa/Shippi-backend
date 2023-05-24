const db = require("../db/connection");

function fetchAllRates() {
    let sqlString = `SELECT * FROM rates;`;
    return db.query(sqlString).then(({ rows }) => {
        return rows;
    });
}

module.exports = {
    fetchAllRates,
};
