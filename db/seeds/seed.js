const db = require("../connection");
const format = require("pg-format");

const seed = ({ shipmentsData, shippingData, sendersData, receiversData }) => {
    return db
        .query(`DROP TABLE IF EXISTS senders;`)
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS receivers;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS shipments;`);
        })
        .then(() => {
            return db.query(`DROP TABLE IF EXISTS rates;`);
        })
        .then(() => {
            return db.query(`
			CREATE TABLE shipments (
                shipment_id SERIAL PRIMARY KEY,
                weight DECIMAL NOT NULL,
                method VARCHAR NOT NULL,
                sender_details VARCHAR,
                receipt_details VARCHAR NOT NULL,
                cost DECIMAL(10, 2) NOT NULL,
                shipment_date VARCHAR(50)
			);`);
        })
        .then(() => {
            return db.query(`
			CREATE TABLE rates (
                shipping_id SERIAL PRIMARY KEY,
                minWeight DECIMAL NOT NULL,
                maxWeight DECIMAL NOT NULL,
                type VARCHAR NOT NULL,
                baseCost DECIMAL(10, 2) NOT NULL,
                leadTime VARCHAR NOT NULL
                );`);
        })
        .then(() => {
            return db.query(`
            CREATE TABLE senders (
                sender_id SERIAL PRIMARY KEY,
                shipment_id INT REFERENCES shipments(shipment_id) NOT NULL,
                first_name VARCHAR NOT NULL,
                last_name VARCHAR NOT NULL,
                email_address VARCHAR NOT NULL,
                address_line_1 VARCHAR NOT NULL,
                address_line_2 VARCHAR,
                city VARCHAR NOT NULL,
                country VARCHAR NOT NULL,
                post_code VARCHAR NOT NULL
            );`);
        })
        .then(() => {
            return db.query(`
            CREATE TABLE receivers (
                receiver_id SERIAL PRIMARY KEY,
                shipment_id INT REFERENCES shipments(shipment_id) NOT NULL,
                first_name VARCHAR NOT NULL,
                last_name VARCHAR NOT NULL,
                email_address VARCHAR NOT NULL,
                address_line_1 VARCHAR NOT NULL,
                address_line_2 VARCHAR,
                city VARCHAR NOT NULL,
                country VARCHAR NOT NULL,
                post_code VARCHAR NOT NULL 
            )
            `);
        })
        .then(() => {
            const insertShipmentsQueryStr = format(
                "INSERT INTO shipments (weight, method, sender_details, receipt_details, cost, shipment_date) VALUES %L;",
                shipmentsData.map(
                    ({
                        weight,
                        method,
                        sender_details,
                        receipt_details,
                        cost,
                        shipment_date,
                    }) => [
                        weight,
                        method,
                        sender_details,
                        receipt_details,
                        cost,
                        shipment_date,
                    ]
                )
            );
            return db.query(insertShipmentsQueryStr);
        })
        .then(() => {
            const insertShippingQueryStr = format(
                "INSERT INTO rates (minWeight, maxWeight, type, baseCost, leadTime) VALUES %L;",
                shippingData.map(
                    ({ minWeight, maxWeight, type, baseCost, leadTime }) => [
                        minWeight,
                        maxWeight,
                        type,
                        baseCost,
                        leadTime,
                    ]
                )
            );
            return db.query(insertShippingQueryStr);
        })
        .then(() => {
            const insertSendersQueryStr = format(
                "INSERT INTO senders(shipment_id, first_name, last_name, email_address, address_line_1, address_line_2, city, country, post_code) VALUES %L;",
                sendersData.map(
                    ({
                        shipment_id,
                        first_name,
                        last_name,
                        email_address,
                        address_line_1,
                        address_line_2,
                        city,
                        country,
                        post_code,
                    }) => [
                        shipment_id,
                        first_name,
                        last_name,
                        email_address,
                        address_line_1,
                        address_line_2,
                        city,
                        country,
                        post_code,
                    ]
                )
            );
            return db.query(insertSendersQueryStr);
        })
        .then(() => {
            const insertReceiversQueryStr = format(
                "INSERT INTO receivers(shipment_id, first_name, last_name, email_address, address_line_1, address_line_2, city, country, post_code) VALUES %L;",
                receiversData.map(
                    ({
                        shipment_id,
                        first_name,
                        last_name,
                        email_address,
                        address_line_1,
                        address_line_2,
                        city,
                        country,
                        post_code,
                    }) => [
                        shipment_id,
                        first_name,
                        last_name,
                        email_address,
                        address_line_1,
                        address_line_2,
                        city,
                        country,
                        post_code,
                    ]
                )
            );
            return db.query(insertReceiversQueryStr);
        });
};

module.exports = seed;
