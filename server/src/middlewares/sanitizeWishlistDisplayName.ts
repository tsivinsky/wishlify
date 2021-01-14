import { Request, Response, NextFunction } from "express";

export function sanitizeWishlistDisplayName(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { displayName } = req.params;

  if (displayName) {
    req.params.displayName = displayName.toLowerCase();
  }

  next();
}
