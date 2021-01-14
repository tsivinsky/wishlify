// Dependencies
import express from "express";
import { authController as controller } from "../controllers";

const router = express.Router();

// Routes
router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
