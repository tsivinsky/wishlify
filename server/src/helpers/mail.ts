import { transporter } from "../transporter";

export async function sendConfirmationEmail(email: string, url: string) {
  const text = `
    Hey, you signed in to Wishlify. Please, verify that it was actually you by clicking the link below.

    ${url}
  `;

  await transporter.sendMail({
    from: `Wishlify <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Wishlify - Sign In",
    text,
  });
}
