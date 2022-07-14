import { helpers, httpErrors } from "oak";
import { Context } from "types";
import { PermissionStrings } from "constants";
import { logger, validatePermissions } from "utils";

/**
 * Has user permission middleware
 * checks authorization for context user and user permissions if provided
 */
export function userGuard(types: string[], ...permissions: PermissionStrings[]) {
  const typesSet = new Set(types);
  //TODO anpassen!
  return async function (context: Context, next: () => Promise<unknown>) {
    const tokenType = context.state.tokenType;

    if (!tokenType || !typesSet.has(tokenType)) throw new httpErrors.Unauthorized("unauthorized");
    //typeset = ["Client", "Application"]
    //typesSet.has("Client")
    if (tokenType === "Client") {
      if (!context.state.user) {
        await context.cookies.set("redirect", context.request.url.pathname, {
          httpOnly: false,
        });
        throw new httpErrors.Unauthorized("unauthorized");
      }

      const perms = context.state.user.permissions;
      // If permissions specified, then check logged in users permissions
      if (permissions && !validatePermissions(perms, permissions, tokenType)) {
        throw new httpErrors.Forbidden("missing access");
      }

      return await next();
    }

    if (tokenType === "Application") {
      //do stuff
    }

    if (tokenType === "Bearer") {
      //do stuff
      const scopes = context.state.bearer?.scopes;
      /**
       * token: {
       * scopes: {
       * user.read
       * user.write
       * }
       * }
       */
    }

    throw new httpErrors.BadRequest("Invalid access token provided");
  };
}
