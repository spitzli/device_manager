import { Context } from "types";
import { httpErrors, Router } from "oak";
import { ratelimit, requestValidator, captcha } from "middlewares";
import * as validator from "validasaur";
import db from "database";
import * as bcrypt from "bcrypt";
import { setTokens, sendEta } from "helpers";
import { quickId } from "utils";
import { configs } from "config";

export default new Router()
  .post(
    "/auth/login",
    ratelimit(600, 10),
    requestValidator({
      email: [validator.required, validator.isEmail],
      password: validator.required,
      captcha: validator.required,
    }),
    captcha(),
    async (context: Context) => {
      interface Body {
        email: string;
        password: string;
        captcha: string;
      }
      const body: Body = await context.request.body({ type: "json" }).value.catch(() => ({}));

      const [user] = await db
        .select(db.users.id, db.users.email, db.users.permissions, db.users.password)
        .from(db.users)
        .where(db.users.email.eq(body.email));

      if (!user.email || !user.password) throw new httpErrors.BadRequest("email or password is wrong");

      if (!(await bcrypt.compare(body.password, user.password)))
        throw new httpErrors.BadRequest("email or password is wrong");

      await setTokens(
        {
          id: user.id,
          email: user.email,
          permissions: user.permissions,
          sessionId: quickId(),
        },
        context,
      );
      context.response.status = 200;
      return (context.response.body = { status: 200, message: "ok" });
    },
  )
  .get("/login", (context: Context) => {
    if (context.state.user) return context.response.redirect("/overview");
    context.response.status = 200;
    return sendEta(context, "login", {
      page: {
        title: "Login",
      },
      captcha: {
        siteKey: configs.captcha.siteKey,
      },
    });
  })
  .all("/login", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
