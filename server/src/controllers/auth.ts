import { Request, Response } from "express";
import validator from "validator";
import { User } from "../models";
import { createToken, checkPassword } from "../helpers";

export async function register(req: Request, res: Response) {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).send("Empty value");
  }

  if (password.length < 8) {
    return res
      .status(400)
      .send("Password length shoudn`t be less than 8 symbols");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  const emailTaken = await User.findOne({ email });
  if (emailTaken) {
    return res.status(400).send("Email already registered");
  }

  const usernameTaken = await User.findOne({ username });
  if (usernameTaken) {
    return res.status(400).send("This username already taken");
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  const token = await createToken(user.toJSON());

  const savedUser = await user.save();

  return res.status(201).json({ user: savedUser, token });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Empty value");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Email does not exist");
  }

  const isMatch = checkPassword(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  const token = await createToken(user.toJSON());

  return res.status(200).json({ user, token });
}
