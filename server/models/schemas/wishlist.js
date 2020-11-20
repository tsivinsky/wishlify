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
        ref: "Product",
        type: mongoose.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

// Export wishlist schema
module.exports = schema;
