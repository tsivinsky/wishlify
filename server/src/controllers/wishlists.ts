import { Request, Response } from "express";
import { Wishlist, Product } from "../models";
import { getProductData } from "../helpers";

export async function getUserWishlists(req: Request, res: Response) {
  const { _id: owner } = req.user;

  const wishlists = await Wishlist.find({ owner });

  res
    .status(200)
    .json({ message: "Wishlists were found", data: { wishlists } });
}

export async function createWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is not provided" });
  }

  const wishlist = await Wishlist.create({
    name,
    description,
    owner,
    products: [],
  });

  const savedWishlist = await wishlist.save();

  return res.status(201).json({
    message: "Wishlist was created",
    data: { wishlist: savedWishlist },
  });
}

export async function getWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;

  const wishlist = await Wishlist.findOne({ displayName, owner });
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist was not found" });
  }

  return res
    .status(200)
    .json({ message: "Wishlist was found", data: { wishlist } });
}

export async function updateWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;
  const { name, description } = req.body;

  const wishlist = await Wishlist.findOne({ displayName, owner });

  if (name) {
    wishlist.name = name;
  }

  if (description) {
    wishlist.description = description;
  }

  const updatedWishlist = await wishlist.save();

  return res.status(200).json({
    message: "Wishlist was updated",
    data: { wishlist: updatedWishlist },
  });
}

export async function deleteWishlist(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;

  const wishlist = await Wishlist.findOneAndDelete({ displayName, owner });

  return res
    .status(200)
    .json({ message: "Wishlist was deleted", data: { wishlist } });
}

export async function addProduct(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Url is not provided" });
  }

  const wishlist = await Wishlist.findOne({ displayName, owner });

  // Check if this product already exists in this wishlist
  const productIndex = wishlist.products.findIndex((p) => p.url === url);
  if (productIndex !== -1) {
    return res
      .status(400)
      .json({ message: "You already have this product in this wishlist" });
  }

  // Check if product with the same url already exists in database
  let product = await Product.findOne({ url });
  if (!product) {
    const productData = await getProductData(url);

    product = await Product.create(productData);
  }

  const savedProduct = await product.save();

  wishlist.products.push(savedProduct._id);

  const updatedWishlist = await wishlist.save();

  return res.status(201).json({
    message: "Product added to wishlist",
    data: { wishlist: updatedWishlist },
  });
}

export async function removeProduct(req: Request, res: Response) {
  const { _id: owner } = req.user;
  const { displayName, productID } = req.params;

  const wishlist = await Wishlist.findOne({ displayName, owner });

  // Find product index in wishlist
  const productIndex = wishlist.products.findIndex((p) => p._id == productID);

  if (productIndex === -1) {
    return res.status(400).json({ message: "Product not found" });
  }

  wishlist.products.splice(productIndex, 1);

  const updatedWishlist = await wishlist.save();

  return res.status(200).json({
    message: "Product was deleted",
    data: { wishlist: updatedWishlist },
  });
}
