const db = require("../db/connection");

function fetchAllShipments() {
    let sqlString = `SELECT * FROM shipments;`;

    return db.query(sqlString).then(({ rows }) => {
        return rows;
    });
}

function insertShipment({
    weight,
    method,
    sender_details,
    receipt_details,
    cost,
    shipment_date,
}) {
    let sqlString = `
  INSERT INTO shipments 
  (weight, method, sender_details, receipt_details, cost, shipment_date) 
  VALUES ($1, $2, $3, $4, $5, $6) 
  RETURNING *`;
    const shipmentValues = [
        weight,
        method,
        sender_details,
        receipt_details,
        cost,
        shipment_date,
    ];
    return db.query(sqlString, shipmentValues).then(({ rows: [shipment] }) => {
        return shipment;
    });
}

function fetchShipment(id) {
    let sqlString = `
  SELECT * FROM shipments
  WHERE shipment_id = $1
  `;
    return db.query(sqlString, [id]).then(({ rows: [shipment] }) => {
        return shipment;
    });
}

function fetchSender(id) {
    let sqlString = `
  SELECT * FROM senders
  WHERE shipment_id = $1
  `;

    return db.query(sqlString, [id]).then(({ rows: [sender] }) => {
        return sender;
    });
}

function fetchReceiver(id) {
    let sqlString = `
SELECT * FROM receivers
WHERE shipment_id = $1
`;

    return db.query(sqlString, [id]).then(({ rows: [receiver] }) => {
        return receiver;
    });
}

function insertSender(
    id,
    {
        first_name,
        last_name,
        email_address,
        address_line_1,
        address_line_2,
        city,
        country,
        post_code,
    }
) {
    let sqlString = `
  INSERT INTO senders 
  (shipment_id, first_name, last_name, email_address, address_line_1, address_line_2, city, country, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *
  `;
    const senderValues = [
        id,
        first_name,
        last_name,
        email_address,
        address_line_1,
        address_line_2,
        city,
        country,
        post_code,
    ];

    return db.query(sqlString, senderValues).then(({ rows: [sender] }) => {
        return sender;
    });
}

function insertReceiver(
    id,
    {
        first_name,
        last_name,
        email_address,
        address_line_1,
        address_line_2,
        city,
        country,
        post_code,
    }
) {
    let sqlString = `
INSERT INTO receivers 
(shipment_id, first_name, last_name, email_address, address_line_1, address_line_2, city, country, post_code)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *
`;
    const receiverValues = [
        id,
        first_name,
        last_name,
        email_address,
        address_line_1,
        address_line_2,
        city,
        country,
        post_code,
    ];

    return db.query(sqlString, receiverValues).then(({ rows: [receiver] }) => {
        return receiver;
    });
}

module.exports = {
    fetchAllShipments,
    insertShipment,
    fetchShipment,
    fetchSender,
    fetchReceiver,
    insertSender,
    insertReceiver,
};
