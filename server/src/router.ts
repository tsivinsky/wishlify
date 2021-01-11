import express from "express";

const router = express.Router();

// Routers
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import wishlistsRouter from "./routes/wishlists";
import userRouter from "./routes/user";

// Routes
router.use(authRouter); // /auth
router.use(usersRouter); // /users
router.use(wishlistsRouter); // /wishlists
router.use(userRouter); // /user

export default router;
