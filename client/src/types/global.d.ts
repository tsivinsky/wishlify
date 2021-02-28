import { StringLiteral } from "@babel/types";

declare global {
  interface IUser {
    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export {};
