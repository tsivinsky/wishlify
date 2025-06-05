import { User } from "./user";

export type Wishlist = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
};
