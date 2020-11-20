// Require dependencies
const db = require("../db");
const schema = require("./schemas/product");

// Product model
const Product = db.model("Product", schema, "products");

// Export product model
module.exports = Product;
