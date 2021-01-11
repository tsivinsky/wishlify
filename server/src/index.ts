// Dependencies
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// Load environment variables
dotenv.config();

import "./db";
import router from "./router";

// Initialize application
const app = express();

// Disable x-powered-by
app.disable("x-powered-by");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
