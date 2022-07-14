import { brightGreen, brightBlue, brightYellow, brightRed, green, yellow, blue, white, red, bold } from "fmt/colors.ts";
import { Context } from "types";
import { logger } from "utils";
import { configs } from "config";

const log = logger({ name: "Logger Middleware", logLevel: configs.general.env === "development" ? 0 : 1 });

export async function loggerMiddleware(context: Context, next: () => Promise<unknown>) {
  await next();
  const reqTime = context.response.headers.get("X-Response-Time");
  const status = context.response.status;
  const method = context.request.method;
  let color;
  let code;
  if (status >= 200 && status < 300) {
    code = brightGreen;
  } else if (status >= 300 && status < 400) {
    code = brightBlue;
  } else if (status >= 400 && status < 500) {
    code = brightYellow;
  } else {
    code = brightRed;
  }
  switch (method) {
    case "GET":
      color = green;
      break;
    case "POST":
      color = yellow;
      break;
    case "PUT":
      color = blue;
      break;
    case "PATCH":
      color = white;
      break;
    case "DELETE":
      color = red;
      break;
    default:
      color = white;
      break;
  }
  if (/\.(css|js|jpg|png|ico|woff2|woff|ttf|wasm|svg|map)$/.test(context.request.url.pathname)) {
    return log.debug(
      color(bold(`${context.request.method} `)) +
        `${context.request.url.pathname} ` +
        code(`${status} `) +
        `${reqTime}`,
    );
  }
  if (context.request.url.pathname === "/__vite_ping") return;
  log.info(
    color(bold(`${context.request.method} `)) + `${context.request.url.pathname} ` + code(`${status} `) + `${reqTime}`,
  );
}
