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

  interface PageProps {
    router: NextRouter;
  }
}

export {};
