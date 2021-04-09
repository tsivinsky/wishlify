import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmed: boolean;
}

interface UserDoc extends IUser, Document {
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
schema.pre<UserDoc>("save", function (): void {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
  }
});

// User model
export const User = mongoose.model<UserDoc>("User", schema, "users");
