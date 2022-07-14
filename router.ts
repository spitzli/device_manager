import { Router } from "oak";
import { logger } from "utils";
import { configs } from "config";
import { walk } from "fs/walk.ts";
import { formatTime } from "utils";

const start = Date.now();
const log = logger({
  name: "Router",
  logLevel: configs.general.env === "development" ? 0 : 1,
});
log.info("Starting to Register all Routes");

export const router = new Router();
const walkEntries = walk("./routes", { includeDirs: false });

for await (const walkEntry of walkEntries) {
  const start = Date.now();
  const im = await import(`./${walkEntry.path}`);
  router.use(im.default.routes());
  log.info(`Register Routes from ${walkEntry.path} || ${formatTime(Date.now() - start)}`);
}

log.info(`All Routes Registerd || ${formatTime(Date.now() - start)}`);
