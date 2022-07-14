import { Context } from "types";
import { httpErrors, Router } from "oak";
import { sendEta } from "helpers";
import { userGuard } from "middlewares";

export default new Router()
  .get("/overview", userGuard(["Client"], "ADMIN"), (context: Context) => {
    return sendEta(context, "overview", {
      page: {
        title: "Übersicht",
      },
      user: context.state.user,
    });
  })
  .all("/overview", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
