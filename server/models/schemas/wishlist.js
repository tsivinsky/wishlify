// Require dependencies
const mongoose = require("mongoose");

// Wishlist schema
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    owner: {
      type: String,
      required: true,
    },
    products: [
      {
        title: String,
        price: {
          amount: String,
          currency: String,
        },
        url: String,
        shop: String,
      },
    ],
  },
  { timestamps: true }
);

// Export wishlist schema
module.exports = schema;
