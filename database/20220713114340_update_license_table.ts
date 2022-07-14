import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
    ALTER TABLE "public"."license" 
      DROP CONSTRAINT "license_pkey",
      ADD CONSTRAINT "license_pkey" PRIMARY KEY ("id"),
      ADD CONSTRAINT "software_id" FOREIGN KEY ("software_id") REFERENCES "public"."software" ("id");
      ADD CONSTRAINT "geraete_id" FOREIGN KEY ("geraete_id") REFERENCES "public"."geraete" ("id");
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(``);
  }
}
