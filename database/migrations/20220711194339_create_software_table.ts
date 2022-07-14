import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
    CREATE TABLE "public"."software" (
      "id" text NOT NULL,
      "bezeichnung" text NOT NULL,
      PRIMARY KEY ("id")
    )
    ;
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(`drop table software;`);
  }
}
