import { Context } from "types";
import { httpErrors, Router } from "oak";
import db from "database";
import { requestValidator } from "middlewares";
import * as validator from "validasaur";
import { userGuard } from "middlewares";

export default new Router({ prefix: "/api" })
  .get("/device", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    context.response.type = "application/json";
    const data = await db
      .select(
        db.geraete.id,
        db.geraete.name,
        db.geraete.vorname,
        db.geraete.username,
        db.geraete.password,
        db.geraete.computername,
        db.geraete.workgroup,
        db.geraete.system,
        db.geraete.ip_adress,
        db.geraete.mac_adress,
        db.geraete.datum,
        db.geraete.license_id,
        db.geraete.amount,
      )
      .from(db.geraete);
    return (context.response.body = { data });
  })
  .post(
    "/device",
    requestValidator({
      id: validator.required,
      name: validator.required,
      vorname: validator.required,
      username: validator.required,
      password: validator.required,
      computername: validator.required,
      workgroup: validator.required,
      system: validator.required,
      ip_adress: validator.required,
      mac_adress: validator.required,
      datum: validator.required,
    }),
    userGuard(["Client"], "ADMIN"),
    async (context: Context) => {
      const {
        id,
        name,
        vorname,
        username,
        password,
        computername,
        workgroup,
        system,
        ip_adress,
        mac_adress,
        datum,
        license_id,
        amount,
      } = await context.request.body({ type: "json" }).value.catch(() => ({}));

      await db
        .insertInto(db.geraete)
        .values({
          id,
          name,
          vorname,
          username,
          password,
          computername,
          workgroup,
          system,
          ip_adress,
          mac_adress,
          datum,
          license_id,
          amount,
        })
        .onConflict("id")
        .doUpdateSet({
          name,
          vorname,
          username,
          password,
          computername,
          workgroup,
          system,
          ip_adress,
          mac_adress,
          datum,
          license_id,
          amount,
        });

      const remainingLicense = await db
        .select(db.license.quantity)
        .from(db.license)
        .where(db.license.id.eq(license_id));

      if (!remainingLicense[0].quantity) throw new httpErrors.BadRequest("License is empty");

      if (amount > parseInt(remainingLicense[0].quantity)) {
        throw new httpErrors.BadRequest("Not enough licenses");
      }

      await db
        .update(db.license)
        .set({
          quantity: (parseInt(remainingLicense[0].quantity) - parseInt(amount)).toString(),
        })
        .where(db.license.id.eq(license_id));

      return (context.response.body = {
        status: 200,
        message: "ok",
      });
    },
  )
  .delete("/device", userGuard(["Client"], "ADMIN"), async (context: Context) => {
    const { id } = await context.request.body({ type: "json" }).value.catch(() => ({}));

    const device = await db
      .select(db.geraete.license_id, db.geraete.amount)
      .from(db.geraete)
      .where(db.geraete.id.eq(id));

    if (!device[0].license_id) throw new httpErrors.BadRequest("Device has no license");

    const remainingLicense = await db
      .select(db.license.quantity)
      .from(db.license)
      .where(db.license.id.eq(device[0].license_id));

    if (!remainingLicense[0].quantity) throw new httpErrors.BadRequest("License is empty");

    if (!device[0].amount) throw new httpErrors.BadRequest("Not enough licenses");

    await db
      .update(db.license)
      .set({
        quantity: (parseInt(remainingLicense[0].quantity) + parseInt(device[0].amount)).toString(),
      })
      .where(db.license.id.eq(device[0].license_id));

    await db.deleteFrom(db.geraete).where(db.geraete.id.eq(id));

    return (context.response.body = {
      status: 200,
      message: "ok",
    });
  })
  .all("/device", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
