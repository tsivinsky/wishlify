import { User } from "./user";

export type Wishlist = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  products: Product[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
};
