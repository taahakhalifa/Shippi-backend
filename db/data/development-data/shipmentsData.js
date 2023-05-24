const shipmentData = [
    {
        shipment_id: 1,
        weight: 1,
        method: "International",
        sender_details: "John Doe, London",
        receipt_details: "Jane Smith, New York",
        shipment_date: "2023-05-10",
        cost: 5.59,
    },
    {
        shipment_id: 2,
        weight: 6,
        method: "International",
        sender_details: "Alice Johnson, Sydney",
        receipt_details: "Bob Johnson, Los Angeles",
        shipment_date: "2023-05-12",
        cost: 7.99,
    },
    {
        shipment_id: 3,
        weight: 15,
        method: "Standard UK&I",
        sender_details: "Charlie Brown, Dublin",
        receipt_details: "Lucy Pelt, Belfast",
        shipment_date: "2023-05-15",
        cost: 17.59,
    },
    {
        shipment_id: 4,
        weight: 80,
        method: "Intergalactic",
        sender_details: "Buzz Lightyear, Star Command",
        receipt_details: "Emperor Zurg, Planet Z",
        shipment_date: "2023-05-18",
        cost: 3950175.99,
    },
];

module.exports = shipmentData;
