import { Context } from "types";
import { httpErrors, Router } from "oak";
import db from "database";
import { userGuard } from "middlewares";

export default new Router({ prefix: "/api" })
  .get("/overview", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    context.response.type = "application/json";
    const data = await db
      .select(db.geraete.computername, db.geraete.ip_adress, db.geraete.datum, db.software.bezeichnung, db.license.key)
      .from(db.license)
      .innerJoin(db.software)
      .on(db.license.software_id.eq(db.software.id))
      .innerJoin(db.geraete)
      .on(db.license.geraete_id.eq(db.geraete.id));

    return (context.response.body = { data });
  })
  .all("/device", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
