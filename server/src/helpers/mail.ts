import { transporter } from "../transporter";

export async function sendConfirmationEmail(
  email: string,
  confirmationCode: number
) {
  const text = `
    Hey, you signed in to Wishlify. Please, verify that it was actually you by pasting the code below to the form on the signin page.

    Your code is ${confirmationCode}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Wishlify - Sign In",
    text,
  });
}
