import express from "express";

const router = express.Router();

// Middleware function for verifying user
import { verifyUser } from "../middlewares/verifyUser";

// Controller
import { userController as controller } from "../controllers";

// Routes
router.get("/user", verifyUser, controller.getUser);
router.get("/user/wishlists", verifyUser, controller.getUserWishlists);
router.post("/user/wishlists", verifyUser, controller.createWishlist);
router.get(
  "/user/wishlists/:displayName",
  verifyUser,
  controller.getWishlistByDisplayName
);

export default router;
