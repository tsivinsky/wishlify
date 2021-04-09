import express from "express";
import { authController as controller } from "../controllers";

export const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
