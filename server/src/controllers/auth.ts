import { Request, Response } from "express";
import validator from "validator";
import { User } from "../models";
import { jwt, mail } from "../helpers";
import { generateConfirmationCode } from "../helpers";

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

  const confirmationCode = generateConfirmationCode();
  await mail.sendConfirmationEmail(user.email, confirmationCode);

  const token = await jwt.createToken({ _id: user._id });

  req.session.confirmationCode = confirmationCode;
  req.session.userID = user._id;
  req.session.token = token;

  return res.status(200).json({ message: "You successfully authenticated" });
}

export async function verifyCode(req: Request, res: Response) {
  const { code } = req.body as { code: number };

  if (!code) {
    return res.status(400).json({ message: "Code is not provided" });
  }

  if (!req.session.token) {
    return res
      .status(400)
      .json({ message: "You first need to sign in using email" });
  }

  if (req.session?.confirmationCode !== code) {
    return res.status(400).json({ message: "Invalid code" });
  }

  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.status(404).json({ message: "User was not found" });
  }

  return res.status(200).json({
    message: "You successfully signed in",
    data: { user, token: req.session.token },
  });
}
