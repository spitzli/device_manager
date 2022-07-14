import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";
import db from "database";
import { generateMaylily, hashPassword } from "utils";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await db.insertInto(db.users).values({
      id: await generateMaylily(),
      email: "admin@localhost.de",
      password: await hashPassword("changeme"),
      permissions: 7n,
    });
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(``);
  }
}
