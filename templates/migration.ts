import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(``);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(``);
  }
}
