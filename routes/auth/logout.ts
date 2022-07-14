import { Context } from "types";
import { httpErrors, Router } from "oak";
import db from "database";
import { cachedSessions } from "middlewares";

export default new Router()
  .get("/logout", async (context: Context) => {
    context.cookies.delete("token");
    if (!context.state.user) return;
    const [deletedSession] = await db
      .deleteFrom(db.sessions)
      .where(
        db.sessions.userId
          .eq(BigInt(context.state.user.id))
          .and(db.sessions.sessionId.eq(context.state.user.sessionId)),
      )
      .returning("sessionId");

    cachedSessions.delete(deletedSession.sessionId);

    context.response.redirect("/");
  })
  .all("/logout", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
