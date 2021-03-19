// Dependencies
import express from "express";
import { wishlistsController as controller } from "../controllers";
import {
  sanitizeWishlistDisplayName,
  wishlistsMiddleware,
  verifyUser,
} from "../middlewares";

export const router = express.Router();

// Middlewares
router.use(verifyUser);
router.use("/:displayName", sanitizeWishlistDisplayName, wishlistsMiddleware);

// Routes
router.get("/", controller.getUserWishlists);
router.post("/", controller.createWishlist);
router.get("/:displayName", controller.getWishlist);
router.patch("/:displayName", controller.updateWishlist);
router.delete("/:displayName", controller.deleteWishlist);
router.post("/:displayName/products", controller.addProduct);
router.delete("/:displayName/products/:productID", controller.removeProduct);
