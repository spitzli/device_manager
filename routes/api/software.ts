import { Context } from "types";
import { httpErrors, Router } from "oak";
import db from "database";
import { requestValidator } from "middlewares";
import * as validator from "validasaur";
import { userGuard } from "middlewares";

export default new Router({ prefix: "/api" })
  .get("/software", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    context.response.type = "application/json";
    const data = await db.select(db.software.id, db.software.bezeichnung).from(db.software);
    return (context.response.body = { data });
  })
  .post(
    "/software",
    requestValidator({
      id: validator.required,
      bezeichnung: validator.required,
    }),
    userGuard(["Client"], "ADMIN"),
    async (context: Context) => {
      const { id, bezeichnung } = await context.request.body({ type: "json" }).value.catch(() => ({}));

      await db
        .insertInto(db.software)
        .values({
          id,
          bezeichnung,
        })
        .onConflict("id")
        .doUpdateSet({
          bezeichnung,
        });

      return (context.response.body = {
        status: 200,
        message: "ok",
      });
    },
  )
  .delete("/software", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    const { id } = await context.request.body({ type: "json" }).value.catch(() => ({}));

    await db.deleteFrom(db.software).where(db.software.id.eq(id));

    return (context.response.body = {
      status: 200,
      message: "ok",
    });
  })
  .all("/software", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
