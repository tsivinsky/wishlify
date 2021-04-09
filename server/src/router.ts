import express from "express";
import { authRouter, userRouter, wishlistsRouter } from "./routes";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/wishlists", wishlistsRouter);
