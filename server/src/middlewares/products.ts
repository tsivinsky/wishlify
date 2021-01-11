import { Request, Response, NextFunction } from "express";
import { Product } from "../models";

// Middleware for checking if product does not exist
export async function productsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { productID } = req.params;

  // Find product by id
  const product = await Product.findById(productID);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  return next();
}
