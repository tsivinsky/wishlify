import { Request, Response } from "express";

export function handleErrors(err, _: Request, res: Response) {
  return res.status(500).json({ err });
}
