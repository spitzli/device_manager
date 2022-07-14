import { Context, User } from "types";
import configs from "config";
import db from "database";
import { createFernetToken } from "utils";
import { Client } from "constants";
import { cachedSessions } from "middlewares";

export async function setTokens(user: Omit<User, "expires"> & { expires?: number }, context: Context) {
  const token = createFernetToken(
    {
      id: user.id.toString(),
      email: user.email,
      permissions: user.permissions.toString(),
      sessionId: user.sessionId,
      expires: Date.now() + configs.fernet.client.live,
    },
    Client,
  );

  await context.cookies.set("token", `Client ${token}`);

  await db
    .insertInto(db.sessions)
    .values({
      userId: user.id,
      sessionId: user.sessionId,
      exp: BigInt(Date.now() + 604800000),
    })
    .onConflict("sessionId", "userId")
    .doUpdateSet({ exp: BigInt(Date.now() + 604800000) });
}
