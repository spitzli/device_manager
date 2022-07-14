import { renderFile } from "eta";
import { CallbackFn } from "eta/types/file-handlers.ts";
import { Context } from "types";
import { configs } from "config";

export async function sendEta(
  context: Context,
  fileName: string,
  // deno-lint-ignore no-explicit-any
  data?: { settings?: { [key: string]: any }; [key: string]: any },
  cb?: CallbackFn,
) {
  try {
    const rendered = await renderFile(
      `${fileName}.ejs`,
      data ?? {},
      {
        views: "./frontend/views",
        cache: configs.general.env !== "development" ? true : false,
        //parse: { raw: "-" },
      },
      cb,
    );
    if (!rendered) {
      context.response.status = 404;
      return (context.response.body = {
        status: 404,
        message: `cannot ${context.request.method} ${context.request.url.pathname}`,
      });
    }

    context.response.body = rendered;
    context.response.type = "text/html";
  } catch (error) {
    if (error.message.startsWith("Could not find the template")) {
      context.response.status = 404;
      return (context.response.body = {
        status: 404,
        message: `cannot ${context.request.method} ${context.request.url.pathname}`,
      });
    }

    throw error;
  }
}
