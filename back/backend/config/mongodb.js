const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URL;

async function dbConnection() {
  try {
    await mongoose.connect(url);
    console.log("Connected with MongoDB");
  } catch {
    console.error("Error with connection to MongoDB");
  }
}

module.exports = dbConnection;
