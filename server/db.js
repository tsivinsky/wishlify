// Require dependencies
const mongoose = require("mongoose");

// Create database connection
const db = mongoose.createConnection(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database has been connected 🚀")
);

// Export database connection
module.exports = db;
