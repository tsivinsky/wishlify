import express from "express";
import {
  authController,
  userController,
  wishlistsController,
} from "./controllers";
import { verifyUser, sanitizeWishlistDisplayName } from "./middlewares";

export const router = express.Router();

router.use("/user", verifyUser);
router.use("/wishlists/:displayName", verifyUser, sanitizeWishlistDisplayName);

// Authentication routes
router.post("/auth/signin", authController.signin);

// User routes
router.get("/user", userController.getUser);
router.patch("/user", userController.updateUser);

// Wishlists routes
router.get("/user/wishlists", wishlistsController.getUserWishlists);
router.post("/user/wishlists", wishlistsController.createWishlist);
router.get("/wishlists/:displayName", wishlistsController.getWishlist);
router.patch("/wishlists/:displayName", wishlistsController.updateWishlist);
router.delete("/wishlists/:displayName", wishlistsController.deleteWishlist);

// Products routes
router.post("/wishlists/:displayName/products", wishlistsController.addProduct);
router.delete(
  "/wishlists/:displayName/products/:productID",
  wishlistsController.removeProduct
);
