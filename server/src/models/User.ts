import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Make sure that this interface has the same exact props as global TUser in types/global.d.ts
 */
export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmed: boolean;
  hashPassword: () => void;
  checkPassword: (password: string) => boolean;
}

// User schema
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Method for hashing password after every change
schema.pre<IUser>("save", function (): void {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
  }
});

// User model
export const User = mongoose.model<IUser>("User", schema, "users");
