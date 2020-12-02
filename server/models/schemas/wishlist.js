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
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        ref: "Product",
        type: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

// Export wishlist schema
module.exports = schema;
