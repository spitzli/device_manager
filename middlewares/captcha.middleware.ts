import configs from "config";
import { httpErrors } from "oak";
import { Context } from "types";
import { buildBody } from "utils";

interface Captcha {
  success: boolean;
  // deno-lint-ignore camelcase
  challenge_ts: number;
  hostname: string;
  credit: boolean;
  "error-codes": string[];
}

export function captcha() {
  return async (context: Context, next: () => Promise<unknown>) => {
    const body = await context.request.body({ type: "json" }).value.catch(() => ({}));

    const response: Captcha = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: buildBody({
        response: body.captcha,
        secret: configs.captcha.secret,
        sitekey: configs.captcha.siteKey,
      }),
    }).then((res) => res.json());

    if (!response.success) {
      throw new httpErrors.BadRequest(response["error-codes"][0]);
    }

    return await next();
  };
}
