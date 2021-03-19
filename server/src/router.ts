// Dependencies
import express from "express";
import { authRouter, userRouter, wishlistsRouter } from "./routes";

const router = express.Router();

// Routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/wishlists", wishlistsRouter);

export default router;
