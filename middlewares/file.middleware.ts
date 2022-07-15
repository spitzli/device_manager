import { send } from "oak";
import { Context } from "types";
import { sendEta } from "helpers";

export async function fileMiddleware(context: Context, next: () => Promise<unknown>) {
  // FAVICON IS SOO COOL SO IT GETS ITS OWN SPECIAL PATH
  if (/^\/favicon.(png|ico)$/.test(context.request.url.pathname)) {
    return await send(context, "/images/favicon.png", {
      root: "./src/frontend/public",
    });
  }
  /*   return send(context, "/index.html", {
    root: "./frontend/dist",
  }); */
  if (/\.(html)$/.test(context.request.url.pathname)) {
    return await sendEta(context, "index", {});
  }

  // NON ETA FILES SHOULD NOT BE RENDERED
  if (/\.(css|js|png|jpg|ico|woff2|woff|ttf|wasm|svg|map)$/.test(context.request.url.pathname)) {
    return await send(context, context.request.url.pathname, {
      root: "./frontend/public",
    });
  }

  await next();
}
