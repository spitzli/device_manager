import { AbstractMigration, ClientPostgreSQL } from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(): Promise<void> {
    await this.client.queryArray(`
        CREATE TABLE "public"."users" (
          "id" bigint NOT NULL,
          "email" text NOT NULL,
          "password" text,
          "permissions" bigint default 2 NOT NULL,
          PRIMARY KEY ("id"),
          CONSTRAINT "email" UNIQUE ("email")
        )
        ;
        
        COMMENT ON COLUMN "public"."users"."id" IS 'The Unique id from the User';
        
        COMMENT ON COLUMN "public"."users"."email" IS 'Email from the User';
        
        COMMENT ON CONSTRAINT "email" ON "public"."users" IS 'Unique key for Email';
    `);
  }

  /** Runs on rollback */
  async down(): Promise<void> {
    await this.client.queryArray(`drop table users;`);
  }
}
