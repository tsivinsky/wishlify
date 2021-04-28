declare module "express-session" {
  interface SessionData {
    confirmationCode: number;
    userID: string;
    token: string;
  }
}

export {};
