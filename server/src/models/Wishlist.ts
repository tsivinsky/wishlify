import mongoose, { Schema, Document } from "mongoose";
import mongooseAutopopulatePlugin from "mongoose-autopopulate";
import { Product } from "./Product";
import { IUser } from "./User";

export interface IWishlist extends Document {
  name: string;
  displayName: string;
  description?: string;
  owner: Schema.Types.ObjectId | IUser;
  products: Array<Schema.Types.ObjectId> | Array<typeof Product>;
}

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
  { timestamps: true, collection: "wishlists" }
);

schema.plugin(mongooseAutopopulatePlugin);

// Update displayName property, when name property is changed
schema.pre<IWishlist>("save", function (next) {
  if (this.isModified("name")) {
    this.displayName = this.name.toLowerCase().replace(/[^\w\s]| /gi, "-");
  }

  next();
});

export const Wishlist = mongoose.model<IWishlist>("Wishlist", schema);
