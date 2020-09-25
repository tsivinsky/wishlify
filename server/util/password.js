// Require dependencies
const bcrypt = require("bcryptjs");

// Function for hashing user's password
module.exports.hashPassword = function (password = "") {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

// Function for comparing user's password with hash in database
module.exports.comparePasswords = function (password = "", hash = "") {
  const isMatch = bcrypt.compareSync(password, hash);

  return isMatch;
};
