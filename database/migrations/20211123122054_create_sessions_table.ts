import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
    CREATE TABLE "public"."sessions" (
      "userId" bigint NOT NULL,
      "sessionId" text NOT NULL,
      "exp" bigint NOT NULL,
      PRIMARY KEY ("userId", "sessionId")
    )
    ;
    
    COMMENT ON COLUMN "public"."sessions"."userId" IS 'The Unique id from a User';
    
    COMMENT ON COLUMN "public"."sessions"."sessionId" IS 'The Unique id from the Session';
    
    COMMENT ON TABLE "public"."sessions" IS 'The Table for all Sessions';
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(`drop table sessions`);
  }
}
