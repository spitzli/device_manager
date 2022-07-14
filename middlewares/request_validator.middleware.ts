import { httpErrors } from "oak";
import * as validator from "validasaur";
import { Context } from "types";
import { getErrorMessage } from "utils";

export const errorMessages = {
  ...validator.defaultMessages,
  isOdd: ":attr must be odd",
};

/**
 * Request validation middleware
 * validate request body with given validation rules
 */
export function requestValidator(bodyRules: validator.ValidationRules) {
  return async (context: Context, next: () => Promise<unknown>) => {
    /** get request body */
    const body = await context.request.body({ type: "json" }).value.catch(() => ({}));

    /** check rules */
    const [isValid, errors] = await validator.validate(body, bodyRules, {
      messages: errorMessages,
    });
    if (!isValid) {
      /** if error found, throw bad request error */
      const message = getErrorMessage(errors);
      throw new httpErrors.BadRequest(message);
    }

    return await next();
  };
}
