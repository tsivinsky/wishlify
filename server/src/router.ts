// Dependencies
import express from "express";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import wishlistsRouter from "./routes/wishlists";

const router = express.Router();

// Routes
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/wishlists", wishlistsRouter);

export default router;
