const shipmentData = [
    {
        id: 1,
        weight: 1,
        method: "International",
        senderDetails: "John Doe, London",
        receiptDetails: "Jane Smith, New York",
        shipmentDate: "2023-05-10",
        cost: 5.59,
    },
    {
        id: 2,
        weight: 6,
        method: "International",
        senderDetails: "Alice Johnson, Sydney",
        receiptDetails: "Bob Johnson, Los Angeles",
        shipmentDate: "2023-05-12",
        cost: 7.99,
    },
    {
        id: 3,
        weight: 15,
        method: "Standard UK&I",
        senderDetails: "Charlie Brown, Dublin",
        receiptDetails: "Lucy van Pelt, Belfast",
        shipmentDate: "2023-05-15",
        cost: 17.59,
    },
    {
        id: 4,
        weight: 80,
        method: "Intergalactic",
        senderDetails: "Buzz Lightyear, Star Command",
        receiptDetails: "Emperor Zurg, Planet Z",
        shipmentDate: "2023-05-18",
        cost: 3950175.99,
    },
];

module.exports = shipmentData;
