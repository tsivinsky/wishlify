import mongoose, { Schema, Document } from "mongoose";
import mongooseAutopopulatePlugin from "mongoose-autopopulate";
import { sanitizeName } from "../helpers";
import { Product } from "./Product";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
    },
    description: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
);

// Mongoose plugin for automatically populating Wishlist model with User and Product data
schema.plugin(mongooseAutopopulatePlugin);

// Function for automatically updating displayName if name was changed
schema.pre<IWishlist>("save", function (next) {
  if (this.isModified("name")) {
    this.displayName = sanitizeName(this.name);
  }

  next();
});

export interface IWishlist extends Document {
  name: string;
  displayName: string;
  description?: string;
  owner: string;
  products: Array<Schema.Types.ObjectId> | Array<typeof Product>;
}

export const Wishlist = mongoose.model<IWishlist>("Wishlist", schema);
