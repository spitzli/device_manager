import { Context } from "types";
import { httpErrors, Router } from "oak";
import db from "database";
import { requestValidator } from "middlewares";
import * as validator from "validasaur";
import { userGuard } from "middlewares";

export default new Router({ prefix: "/api" })
  .get("/license", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    context.response.type = "application/json";
    const data = await db
      .select(
        db.license.id,
        db.license.key,
        db.license.software_id,
        db.license.cors,
        db.license.quantity,
        db.software.bezeichnung,
      )
      .from(db.license)
      .leftJoin(db.software)
      .on(db.software.id.eq(db.license.software_id));
    return (context.response.body = { data });
  })
  .post(
    "/license",
    requestValidator({
      id: validator.required,
      key: validator.required,
      software_id: validator.isString,
      geraete_id: validator.isString,
    }),
    userGuard(["Client"], "ADMIN"),
    async (context: Context) => {
      const { id, key, cors, quantity, software_id } = await context.request
        .body({ type: "json" })
        .value.catch(() => ({}));

      await db
        .insertInto(db.license)
        .values({
          id,
          key,
          cors,
          quantity,
          software_id,
        })
        .onConflict("id")
        .doUpdateSet({
          key,
          cors,
          quantity,
          software_id,
        });

      return (context.response.body = {
        status: 200,
        message: "ok",
      });
    },
  )
  .delete("/license", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    const { id } = await context.request.body({ type: "json" }).value.catch(() => ({}));

    await db.deleteFrom(db.license).where(db.license.id.eq(id));

    return (context.response.body = {
      status: 200,
      message: "ok",
    });
  })
  .all("/license", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
