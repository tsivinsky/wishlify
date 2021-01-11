import express from "express";

const router = express.Router();

// Routers
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import wishlistsRouter from "./routes/wishlists";

// Routes
router.use(authRouter);
router.use(userRouter);
router.use(wishlistsRouter);

export default router;
