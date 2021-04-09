import { Request, Response } from "express";
import { User } from "../models";
import { createToken } from "../helpers";

export async function getUser(req: Request, res: Response) {
  const { username } = req.user;

  const user = await User.findOne({ username });

  return res.status(200).json(user);
}

export async function updateUser(req: Request, res: Response) {
  const { username } = req.user;
  const { name, email, password, username: newUsername } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty value");
  }

  const user = await User.findOne({ username });

  if (name) {
    user.name = name;
  }

  if (email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send("This email already registered");
    }

    user.email = email;
  }

  if (password) {
    user.password = password;
  }

  if (newUsername) {
    const usernameTaken = await User.findOne({ username: newUsername });
    if (usernameTaken) {
      return res.status(400).send("This username already taken");
    }

    user.username = newUsername;
  }

  const token = await createToken(user.toJSON());

  const updatedUser = await user.save();

  return res.status(200).json({ user: updatedUser, token });
}

export async function deleteUser(req: Request, res: Response) {
  const { username } = req.user;

  await User.deleteOne({ username });

  res.status(200).send("User was deleted");
}
