import db from "database";
import { createInterval } from "utils";
import { cachedSessions } from "../middlewares/fernet.middleware.ts";
import { Milliseconds } from "constants";

export const deleteSessions = createInterval("Delete old Sessions", 7 * Milliseconds.Day, async () => {
  const deletedSessions = await db
    .deleteFrom(db.sessions)
    .where(db.sessions.exp.lte(BigInt(Date.now())))
    .returning("sessionId");
  for (const deleted of deletedSessions) {
    cachedSessions.delete(deleted.sessionId);
  }
});
