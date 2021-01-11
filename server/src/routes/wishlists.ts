import express from "express";

const router = express.Router();

// Controller
import { wishlistsController as controller } from "../controllers";

// Routes
router.post("/wishlists", controller.createWishlist);
router.get("/wishlists/:wishlistID", controller.getWishlist);
router.patch("/wishlists/:wishlistID", controller.updateWishlist);
router.delete("/wishlists/:wishlistID", controller.deleteWishlist);
router.delete(
  "/wishlists/:wishlistID/products/:productID",
  controller.removeProductFromWishlist
);

export default router;
