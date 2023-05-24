const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const shipmentsData = require("../db/data/development-data/shipmentsData");
const shippingData = require("../db/data/development-data/shippingData.js");
const sendersData = require("../db/data/development-data/sendersData.js");
const receiversData = require("../db/data/development-data/receiversData.js");

beforeEach(() => {
    return seed({
        shipmentsData,
        shippingData,
        sendersData,
        receiversData,
    });
});

afterAll(() => {
    return db.end();
});

describe("/api/shipments", () => {
    test("GET: 200 - should respond with an array of shipment objects with the required keys", () => {
        return request(app)
            .get("/api/shipments")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeInstanceOf(Array);
                body.forEach((shipment) => {
                    expect(shipment).toHaveProperty("weight");
                    expect(shipment).toHaveProperty("method");
                    expect(shipment).toHaveProperty("shipment_id");
                    expect(shipment).toHaveProperty("sender_details");
                    expect(shipment).toHaveProperty("receipt_details");
                    expect(shipment).toHaveProperty("cost");
                    expect(shipment).toHaveProperty("shipment_date");
                });
            });
    });
    test("POST: 201 - respond with the posted shipment, sender and receiver where the request body accepts an object with all the required keys for both", () => {
        return request(app)
            .post("/api/shipments")
            .expect(201)
            .send({
                shipment: {
                    weight: 1,
                    method: "International",
                    sender_details: "Barry David, London",
                    receipt_details: "Samantha Jones, New York",
                    shipment_date: "2023-03-16",
                    cost: 5.59,
                },
                sender: {
                    first_name: "Barry",
                    last_name: "David",
                    email_address: "barry_david@hotmail.com",
                    address_line_1: "15 Craigswell Street",
                    address_line_2: null,
                    city: "London",
                    country: "United Kingdom",
                    post_code: "LE1 2B4",
                },
                receiver: {
                    first_name: "Samantha",
                    last_name: "Jones",
                    email_address: "samantha_jones@hotmail.com",
                    address_line_1: "15 News Street",
                    address_line_2: null,
                    city: "New York",
                    country: "United States",
                    post_code: "61005",
                },
            })
            .expect(({ body }) => {
                // Shipment tests
                expect(body).toHaveProperty("shipment");
                expect(body.shipment).toHaveProperty("shipment_id");
                expect(body.shipment).toHaveProperty("weight");
                expect(body.shipment).toHaveProperty("sender_details");
                expect(body.shipment).toHaveProperty("receipt_details");
                expect(body.shipment).toHaveProperty("shipment_date");
                expect(body.shipment).toHaveProperty("cost");

                // Sender tests
                expect(body).toHaveProperty("sender");
                expect(body.sender).toHaveProperty("shipment_id");
                expect(body.sender).toHaveProperty("sender_id");
                expect(body.sender).toHaveProperty("first_name");
                expect(body.sender).toHaveProperty("last_name");
                expect(body.sender).toHaveProperty("email_address");
                expect(body.sender).toHaveProperty("address_line_1");
                expect(body.sender).toHaveProperty("address_line_2");
                expect(body.sender).toHaveProperty("city");
                expect(body.sender).toHaveProperty("country");
                expect(body.sender).toHaveProperty("post_code");

                // Receiver tests
                expect(body).toHaveProperty("receiver");
                expect(body.receiver).toHaveProperty("shipment_id");
                expect(body.receiver).toHaveProperty("receiver_id");
                expect(body.receiver).toHaveProperty("first_name");
                expect(body.receiver).toHaveProperty("last_name");
                expect(body.receiver).toHaveProperty("email_address");
                expect(body.receiver).toHaveProperty("address_line_1");
                expect(body.receiver).toHaveProperty("address_line_2");
                expect(body.receiver).toHaveProperty("city");
                expect(body.receiver).toHaveProperty("country");
                expect(body.receiver).toHaveProperty("post_code");
            });
    });
});

describe("/api/shipments/:shipment_id", () => {
    test("GET: 200 - should respond with a shipment object which has all the required keys", () => {
        return request(app)
            .get("/api/shipments/1")
            .expect(200)
            .then(({ body }) => {
                expect(body).toHaveProperty("shipment_id");
                expect(body).toHaveProperty("weight");
                expect(body).toHaveProperty("sender_details");
                expect(body).toHaveProperty("receipt_details");
                expect(body).toHaveProperty("shipment_date");
                expect(body).toHaveProperty("cost");
            });
    });
});

describe("/api/shipments/:shipment_id/sender", () => {
    test("GET: 200 - should respond with a sender object which has all the required keys", () => {
        return request(app)
            .get("/api/shipments/1/sender")
            .expect(200)
            .then(({ body }) => {
                expect(body).toHaveProperty("sender_id");
                expect(body).toHaveProperty("shipment_id");
                expect(body).toHaveProperty("first_name");
                expect(body).toHaveProperty("last_name");
                expect(body).toHaveProperty("email_address");
                expect(body).toHaveProperty("address_line_1");
                expect(body).toHaveProperty("address_line_2");
                expect(body).toHaveProperty("city");
                expect(body).toHaveProperty("country");
                expect(body).toHaveProperty("post_code");
            });
    });
});

describe("/api/shipments/:shipment_id/receiver", () => {
    test("GET: 200 - should respond with a receiver object which has all the required keys", () => {
        return request(app)
            .get("/api/shipments/1/receiver")
            .expect(200)
            .then(({ body }) => {
                expect(body).toHaveProperty("receiver_id");
                expect(body).toHaveProperty("shipment_id");
                expect(body).toHaveProperty("first_name");
                expect(body).toHaveProperty("last_name");
                expect(body).toHaveProperty("email_address");
                expect(body).toHaveProperty("address_line_1");
                expect(body).toHaveProperty("address_line_2");
                expect(body).toHaveProperty("city");
                expect(body).toHaveProperty("country");
                expect(body).toHaveProperty("post_code");
            });
    });
});

describe("/api/rates", () => {
    test("GET: 200 - should respond with an array of shipping rate objects which has all the required keys", () => {
        return request(app)
            .get("/api/rates")
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeInstanceOf(Array);
                body.forEach((rate) => {
                    expect(rate).toHaveProperty("minweight");
                    expect(rate).toHaveProperty("maxweight");
                    expect(rate).toHaveProperty("type");
                    expect(rate).toHaveProperty("basecost");
                    expect(rate).toHaveProperty("leadtime");
                });
            });
    });
});

describe("/api", () => {
    test("GET: 200 - should receive JSON describing all the available endpoints on the API", () => {
        return request(app)
            .get("/api")
            .expect(200)
            .then(({ body: { endpoints } }) => {
                expect(endpoints.hasOwnProperty("GET /api")).toBe(true);
            });
    });
});
