import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers";
import { User } from "../models";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers["authorization"]) {
    return res.sendStatus(401);
  }

  // Test Authorization header with regexp
  if (!/Bearer */i.test(req.headers["authorization"])) {
    return res.sendStatus(401);
  }

  // Verify jsonwebtoken
  const [, token] = req.headers.authorization.split(" ");
  const payload = await verifyToken(token);
  if (!payload) {
    return res.sendStatus(401);
  }

  const user = await User.findById(payload._id);
  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user;

  return next();
}
