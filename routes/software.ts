import { Context } from "types";
import { httpErrors, Router } from "oak";
import { sendEta } from "helpers";
import { userGuard } from "middlewares";

export default new Router()
  .get("/software", userGuard(["Client"], "ADMIN"), (context: Context) => {
    return sendEta(context, "software", {
      page: {
        title: "Software",
      },
      user: context.state.user,
    });
  })
  .all("/software", () => {
    throw new httpErrors.MethodNotAllowed("Method Not Allowed");
  });
