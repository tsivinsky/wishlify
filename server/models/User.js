// Require dependencies
const db = require("../db");
const schema = require("./schemas/user");

// User model
const User = db.model("User", schema, "users");

// Export user model
module.exports = User;
