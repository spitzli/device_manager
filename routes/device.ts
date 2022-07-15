import { Context } from "types";
import { httpErrors, Router } from "oak";
import { sendEta } from "helpers";
import { userGuard } from "middlewares";

export default new Router()
  .get("/geraete", userGuard(["Client"], "ADMIN"), (context: Context) => {
    return sendEta(context, "device", {
      page: {
        title: "Geräte",
      },
      user: context.state.user,
    });
  })
  .all("/geraete", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
