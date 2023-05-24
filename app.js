const express = require("express");
const app = express();

//PATH NOT FOUND ERROR
app.use((req, res) => {
    res.status(404).send({ msg: "Not Found" });
});

module.exports = app;
