import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
    CREATE TABLE "public"."geraete" (
      "id" text NOT NULL,
      "name" text NOT NULL,
      "vorname" text NOT NULL,
      "username" text NOT NULL,
      "password" text NOT NULL,
      "computername" text NOT NULL,
      "workgroup" text NOT NULL,
      "system" text NOT NULL,
      "ip_adress" text NOT NULL,
      "mac_adress" text NOT NULL,
      "datum" text NOT NULL,
      PRIMARY KEY ("id")
    )
    ;
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(`drop table geraete;`);
  }
}
