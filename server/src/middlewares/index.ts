import express from "express";

import { usersMiddleware } from "./users";
import { wishlistsMiddleware } from "./wishlists";
import { productsMiddleware } from "./products";

const router = express.Router();

router.use("/users", usersMiddleware);
router.use("/wishlists", wishlistsMiddleware);
router.use("/products", productsMiddleware);

export default router;
