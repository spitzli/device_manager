import { Application, Bearer, User } from "./mod.ts";

export function isUserPayload(
  type: string,
  // deno-lint-ignore no-unused-vars
  payload: User | Application | Bearer,
): payload is User {
  return type === "Client";
}
