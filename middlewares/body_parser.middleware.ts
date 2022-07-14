import { Context } from "types";

export async function bodyParser(context: Context, next: () => Promise<unknown>) {
  if (context.request.hasBody) {
    if (context.request.headers.get("content-type"))
      switch (context.request.headers.get("content-type")) {
        case "application/json":
          break;
        case "text/plain":
          break;

        default:
          break;
      }
    return await next();
  }
  await next();
}
