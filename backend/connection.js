//DB connection here

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("MongoDb connected");
  } catch (err) {
    console.log("Error connecting to the Db", err);
  }
}

module.exports = connectDB;
