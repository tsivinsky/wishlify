import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: string;
  shipping: string;
  currency: string;
  url: string;
  shop: string;
  image: string;
}

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    shipping: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "products" }
);

export const Product = mongoose.model<IProduct>("Product", schema);
