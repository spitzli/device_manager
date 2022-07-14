import * as mammoth from "mammoth";
import { sql } from "./connection.ts";
import { logger } from "utils";
import * as tables from "./tables.ts";
import { configs } from "config";

const log = logger({ name: "Database", logLevel: configs.general.env === "development" ? 0 : 1 });

await sql`SELECT 1 + 1;`;

export const db = {
  // deno-lint-ignore no-explicit-any
  ...mammoth.defineDb(tables, async (query: string, params: any[]) => {
    log.debug("[DATABASE] running query", query, params);

    const dbResult = await sql.unsafe(query, params);

    log.debug("[DATABASE] query result", query, params, dbResult);

    return {
      rows: dbResult,
      affectedCount: dbResult.count,
    };
  }),
};

// Automatically create nonexistent tables
// await db.createTables();

export default db;
//vandal
