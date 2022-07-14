import { NessieConfig } from "nessie";
import { nessieClient as client } from "database/connection.ts";

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./database/migrations"],
  seedFolders: ["./database/seeds"],
  migrationTemplate: "./templates/migration.ts",
};

export default config;
