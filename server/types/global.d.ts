declare global {
  interface TUser {
    _id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    confirmed: boolean;
  }

  interface IMessages {
    // TODO: Add all the possible messages here
  }
}

export {};
