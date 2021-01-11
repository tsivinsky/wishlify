import { Request, Response, NextFunction } from "express";
import { User } from "../models";

// Middleware for checking if user does not exist
export async function usersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userID } = req.params;

  // Find user by id
  const user = await User.findById(userID);

  if (!user) {
    return res.status(404).send("User not found");
  }

  return next();
}
