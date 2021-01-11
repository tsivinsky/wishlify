declare global {
  namespace Express {
    interface Request {
      messages?: IMessages;
      user?: TUser;
    }
  }
}

export {};
