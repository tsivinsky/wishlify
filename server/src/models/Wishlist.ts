import mongoose, { Schema, Document } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export interface IWishlist extends Document {
  name: string;
  description?: string;
  owner: string;
  products: Array<Schema.Types.ObjectId>;
}

export const Wishlist = mongoose.model<IWishlist>("Wishlist", schema);
