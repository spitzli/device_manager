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
    secret: "0xD639d5350830189036A084Cb23A1E4A8128C07b5",
    siteKey: "53b5c077-a612-453f-8e31-fbe8c61fb1af",
  },
  fernet: {
    client: {
      live: 7 * Milliseconds.Day,
    },
  },
};

export default configs;
