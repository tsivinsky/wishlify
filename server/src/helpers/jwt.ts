import jwt from "jsonwebtoken";

export function createToken(payload: TUser): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function verifyToken(token: string): Promise<any> {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        resolve(null);
      }

      resolve(payload);
    });
  });
}
