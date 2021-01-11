import express from "express";

const router = express.Router();

// Controller
import { usersController as controller } from "../controllers";

/**
 * Yeah, yeah, I know I can put common part to main router in router.ts file and remove from these routes.
 * This way just more clear and readable.
 */
// Routes
router.get("/users/:userID", controller.getUser);
router.patch("/users/:userID", controller.updateUser);
router.get("/users/:userID/wishlists", controller.getUserWishlists);

export default router;
