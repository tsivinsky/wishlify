import mongoose, { Schema, Document } from "mongoose";
import mongooseAutopopulatePlugin from "mongoose-autopopulate";

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

schema.plugin(mongooseAutopopulatePlugin);

schema.pre<IWishlist>("save", function (): void {
  this.displayName = sanitizeName(this.name);
});

export interface IWishlist extends Document {
  name: string;
  displayName: string;
  description?: string;
  owner: string;
  products: Array<Schema.Types.ObjectId>;
}

export const Wishlist = mongoose.model<IWishlist>("Wishlist", schema);

function sanitizeName(name: string): string {
  let displayName: string;

  // Make name to be in lower case
  displayName = name.toLowerCase();

  // Replace all symbols except of "-" and "_" with dash "-"
  displayName = displayName.replace(/[^\w\s]| /gi, "-");

  return displayName;
}
