const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

//server run
const PORT = 5000;
app.listen(PORT, () => console.log("Server is up and running"));
