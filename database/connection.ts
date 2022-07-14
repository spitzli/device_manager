import postgres from "postgres";
import configs from "config";
import { ClientPostgreSQL } from "nessie";

export const sql = postgres({
  database: configs.database.database,
  hostname: configs.database.host,
  port: configs.database.port,
  user: configs.database.user,
  password: configs.database.password,
  max: 20,
  types: {
    bigint: postgres.BigInt,
  },
});

export const nessieClient = new ClientPostgreSQL({
  database: configs.database.database,
  hostname: configs.database.host,
  port: configs.database.port,
  user: configs.database.user,
  password: configs.database.password,
});
