import jwt from "jsonwebtoken";

interface Payload {
  _id: string;
}

export function createToken(payload: Payload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      }
    );
  });
}

export function verifyToken(token: string): Promise<Payload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(err);

      resolve(payload as Payload);
    });
  });
}
