import "dotenv/config";
import "./db";
import "./transporter";
import express from "express";
import cors from "cors";
import { router } from "./router";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
