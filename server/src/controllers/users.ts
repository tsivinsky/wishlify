import { Request, Response } from "express";
import { User } from "../models";
import { createToken } from "../helpers";

// Get user controller
export async function getUser(req: Request, res: Response) {
  const { username } = req.user;

  // Find user by username
  const user = await User.findOne({ username });

  return res.status(200).json(user);
}

// Update user controller
export async function updateUser(req: Request, res: Response) {
  const { username } = req.user;
  const { name, email, password, username: newUsername } = req.body;

  // Check for empty value
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("Empty value");
  }

  // Find user by username
  const user = await User.findOne({ username });

  // Update name
  if (name) {
    user.name = name;
  }

  // Update email
  if (email) {
    // Check if this email already exists in database
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send("This email already registered");
    }

    user.email = email;
  }

  // Update password
  if (password) {
    user.password = password;
  }

  // Update username
  if (newUsername) {
    // Check if this username already taken
    const usernameTaken = await User.findOne({ username: newUsername });
    if (usernameTaken) {
      return res.status(400).send("This username already taken");
    }

    user.username = newUsername;
  }

  // Create new JSON Web Token
  const token = await createToken(user.toJSON());

  // Update user in database
  const updatedUser = await user.save();

  return res.status(200).json({ user: updatedUser, token });
}

// Delete user controller
export async function deleteUser(req: Request, res: Response) {
  const { username } = req.user;

  await User.deleteOne({ username });

  res.status(200).send("User was deleted");
}
