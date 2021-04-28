declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      MONGO_URI: string;
      JWT_SECRET: string;
      SESSION_SECRET: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
    }
  }
}

export {};
