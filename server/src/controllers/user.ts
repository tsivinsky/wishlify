import { Request, Response } from "express";
import { User } from "../models";

export async function getUser(req: Request, res: Response) {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User was not found" });
  }

  return res.status(200).json({ message: "User was found", data: { user } });
}

export async function updateUser(req: Request, res: Response) {
  const { username } = req.body as { username: string };

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User was not found" });
  }

  if (username) {
    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      return res.status(400).json({ message: "This username already taken" });
    }

    user.username = username;
  }

  const savedUser = await user.save();

  return res
    .status(200)
    .json({ message: "User was updated", data: { user: savedUser } });
}
