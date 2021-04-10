import express from "express";
import { authRouter, userRouter, wishlistsRouter } from "./routes";
import { errorController } from "./controllers";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/wishlists", wishlistsRouter);

router.use(errorController.handleErrors);
