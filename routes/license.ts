import { Context } from "types";
import { httpErrors, Router } from "oak";
import { sendEta } from "helpers";
import { userGuard } from "middlewares";

export default new Router()
  .get("/license", userGuard(["Client"], "ADMIN"), (context: Context) => {
    return sendEta(context, "license", {
      page: {
        title: "Lizenzen",
      },
      user: context.state.user,
    });
  })
  .all("/license", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
