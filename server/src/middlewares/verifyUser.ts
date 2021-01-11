import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers";

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers["authorization"]) {
    return res.sendStatus(401);
  }

  // Verify token
  const [, token] = req.headers.authorization.split(" ");
  const user = await verifyToken(token);

  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user;

  return next();
}
