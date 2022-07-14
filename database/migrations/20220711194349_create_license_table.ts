import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
    CREATE TABLE "public"."license" (
      "id" text NOT NULL,
      "key" text NOT NULL,
      "software_id" text,
      "geraete_id" text,
      PRIMARY KEY ("id")
    )
    ;
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(`drop table license`);
  }
}
