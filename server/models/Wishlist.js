// Require dependencies
const db = require("../db");
const schema = require("./schemas/wishlist");

// Wishlist model
const Wishlist = db.model("Wishlist", schema, "wishlists");

// Export wishlist model
module.exports = Wishlist;
