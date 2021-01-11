import express from "express";

const router = express.Router();

// Controller
import { authController as controller } from "../controllers";

// Routes
router.post("/auth/register", controller.register);
router.post("/auth/login", controller.login);

export default router;
