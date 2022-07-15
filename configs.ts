import { Milliseconds } from "constants";

export const configs = {
  general: {
    env: "development",
    hostname: "localhost",
    port: 3000,
  },
  database: {
    host: "localhost",
    port: 5432,
    user: "mgr",
    password: "mgr",
    database: "mgr",
  },
  captcha: {
    secret: "x",
    siteKey: "x",
  },
  fernet: {
    client: {
      live: 7 * Milliseconds.Day,
    },
  },
};

export default configs;
