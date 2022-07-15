import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";
import db from "database";
import { generateMaylily, hashPassword } from "utils";
import { configs } from "config";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await db.insertInto(db.users).values({
      id: await generateMaylily(),
      email: configs.user.email,
      password: await hashPassword(configs.user.password),
      permissions: 7n,
    });
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(``);
  }
}
