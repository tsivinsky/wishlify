// Require dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

schema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
};

schema.methods.checkPassword = function (password = "") {
  const isMatch = bcrypt.compareSync(password, this.password);

  return isMatch;
};

// Export user schema
module.exports = schema;
