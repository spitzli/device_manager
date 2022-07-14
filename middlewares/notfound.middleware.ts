import { Context } from "types";
import { sendEta } from "helpers";

export async function notFound(context: Context) {
  context.response.status = 404;
  if (context.request.url.pathname.split("/")[1] !== "api")
    return await sendEta(context, "404", { page: { title: "404" } });
  context.response.body = {
    status: 404,
    message: `cannot ${context.request.method} ${context.request.url.pathname}`,
  };
}
