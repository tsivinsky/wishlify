// Require dependencies
const express = require("express");
const cors = require("cors");
require("dotenv/config");

// Initialise application
const app = express();

// Setup middlewares
app.use(cors());
app.use(express.json());

// Custom middlewares
app.use("/users", require("./middlewares/users"));
app.use("/wishlists", require("./middlewares/wishlists"));
app.use("/products", require("./middlewares/products"));

// Routes
app.use("/", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/wishlists", require("./routes/wishlists"));
app.use("/products", require("./routes/products"));

// Connect to database
require("./db");

// Listen to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
