import { NextRouter } from "next/router";

declare global {
  interface IUser {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IWishlist {
    _id: string;
    name: string;
    displayName: string;
    description: string;
    owner: IUser;
    products: Array<IProduct>;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IProduct {
    _id: string;
    title: string;
    price: string;
    shipping: string;
    currency: string;
    shop: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface PageProps {
    router: NextRouter;
  }
}

export {};
