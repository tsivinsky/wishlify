import mongoose, { Schema, Document } from "mongoose";

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

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmed: boolean;
  hashPassword: () => void;
  checkPassword: (password: string) => boolean;
}

// User model
export const User = mongoose.model<IUser>("User", schema, "users");
