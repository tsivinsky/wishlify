import { Request, Response, NextFunction } from "express";
import { jwt } from "../helpers";
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

  // Verify token
  const [, token] = req.headers.authorization.split(" ");
  const payload = await jwt.verifyToken(token);
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
