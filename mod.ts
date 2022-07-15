import { Application } from "oak";
import { oakCors } from "cors";
import { formatTime, logger } from "utils";
import { router } from "./router.ts";
import { StateContext } from "types";
import * as middlewares from "middlewares";
import { configs } from "config";
const start = Date.now();

//Migrations
const migration = Deno.run({
  cmd: [
    "deno",
    "run",
    "--allow-read",
    "--allow-net",
    "--allow-env",
    "--unstable",
    "--no-check",
    //"--config=deno.json ",
    "https://deno.land/x/nessie@2.0.5/cli.ts",
    "migrate",
  ],
});

await migration.status();

await import("./intervals/mod.ts");

const log = logger({ name: "Main", logLevel: configs.general.env === "development" ? 0 : 1 });

const app = new Application<StateContext>();

app.addEventListener("listen", ({ port }) => {
  log.info(
    `Server is Ready and Listen on ${configs.general.hostname == "localhost" ? "http" : "https"}://${
      configs.general.hostname
    }:${port} || ${formatTime(Date.now() - start)}`,
  );
});

// * Middlerwares
app.use(oakCors());
app.use(middlewares.loggerMiddleware);
app.use(middlewares.timingMiddleware);
app.use(middlewares.errorMiddleware);
app.use(middlewares.fernetMiddleware);

// Routers
app.use(router.routes());
app.use(router.allowedMethods());

// Static Routes (404 etc)
app.use(middlewares.fileMiddleware);
app.use(middlewares.notFound);

// App Login
app.listen({ port: configs.general.port });
