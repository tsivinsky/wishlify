// Dependencies
import express from "express";
import { verifyUser } from "../middlewares";
import { usersController as controller } from "../controllers";

const router = express.Router();

// Middlewares
router.use("/", verifyUser);

// Routes
router.get("/", controller.getUser);
router.patch("/", controller.updateUser);
router.delete("/", controller.deleteUser);

export default router;