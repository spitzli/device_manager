import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
    ALTER TABLE "public"."geraete" 
      ADD COLUMN "license_id" text,
      ADD COLUMN "amount" text;
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(``);
  }
}
