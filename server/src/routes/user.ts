import express from "express";
import { verifyUser } from "../middlewares";
import { usersController as controller } from "../controllers";

export const router = express.Router();

router.use("/", verifyUser);

router.get("/", controller.getUser);
router.patch("/", controller.updateUser);
router.delete("/", controller.deleteUser);
