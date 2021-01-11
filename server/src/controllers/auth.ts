import { Request, Response } from "express";
import validator from "validator";
import { User } from "../models";
import { createToken, checkPassword } from "../helpers";

// Register controller
export async function register(req: Request, res: Response) {
  const { name, email, username, password } = req.body;

  // Check for empty values
  if (!name || !email || !username || !password) {
    return res.status(400).send("Empty value");
  }

  // Check if password length less than 8 symbols
  if (password.length < 8) {
    return res
      .status(400)
      .send("Password length shoudn`t be less than 8 symbols");
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  // Check if user with this email already registered
  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.status(400).send("Email already registered");
  }

  // Check if this username already taken
  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    return res.status(400).send("This username already taken");
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  // Create JSON Web Token
  const token = await createToken(user.toJSON());

  const savedUser = await user.save();

  return res.status(201).json({ user: savedUser, token });
}

// Login controller
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  // Check for empty values
  if (!email || !password) {
    return res.status(400).send("Empty value");
  }

  // Check if email is invalid
  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  // Check if this email does not registered
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email does not exist");
  }

  // Check if password is invalid
  const isMatch = checkPassword(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  const token = await createToken(user.toJSON());

  return res.status(200).json({ user, token });
}
