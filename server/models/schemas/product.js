// Require dependencies
const mongoose = require("mongoose");

// Product schema
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    amount: String,
    currency: String,
  },
  shipping: {
    amount: String,
    currency: String,
  },
  url: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  image: String,
});

// Export product schema
module.exports = schema;
