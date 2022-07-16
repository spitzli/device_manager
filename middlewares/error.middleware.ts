import { isHttpError, Status } from "oak";
import { Context } from "types";
import { configs } from "config";
import { logger } from "utils";
import { sendEta } from "helpers";

const log = logger({ name: "Error Middleware", logLevel: configs.general.env === "development" ? 0 : 1 });

export async function errorMiddleware(context: Context, next: () => Promise<unknown>) {
  try {
    await next();
  } catch (err) {
    let message = err.message;
    const status = err.status || err.statusCode || Status.InternalServerError;

    /**
     * considering all unhandled errors as internal server error,
     * do not want to share internal server errors to
     * end user in non "development" mode
     */
    if (!isHttpError(err)) {
      if (message === "Invalid Token: HMAC") {
        context.cookies.delete("token");
        return context.response.redirect("/login");
      }
      message = configs.general.env === "development" ? message : "Internal Server Error";
    }

    if (configs.general.env === "development") {
      log.error(err);
    }

    if (status === 401 && context.request.url.pathname.split("/")[1] !== "api") {
      return context.response.redirect("/login");
    }

    context.response.status = status;

    if (context.request.url.pathname.split("/")[1] !== "api")
      return await sendEta(context, "500", { page: { title: "500" } });
    return (context.response.body = { status, message });
  }
}
