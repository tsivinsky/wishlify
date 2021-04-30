import { Request, Response } from "express";
import validator from "validator";
import { User } from "../models";
import { jwt, mail } from "../helpers";

export async function signin(req: Request, res: Response) {
  const { email } = req.body as { email: string };

  if (!email) {
    return res.status(400).json({ message: "Email is not provided" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  let user = await User.findOne({ email });
  if (!user) {
    // TODO: Write username generation in a better way
    const [username] = email.split("@");

    const newUser = await User.create({
      email,
      username,
    });

    user = await newUser.save();
  }

  const token = await jwt.createToken({ _id: user._id });
  const url = `${process.env.CLIENT_URL}/signin/callback?token=${token}`;
  await mail.sendConfirmationEmail(user.email, url);

  return res.status(200).json({
    message: "You successfully authenticated",
  });
}
