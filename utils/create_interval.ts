import { logger, formatTime } from "utils";
import { configs } from "config";

const log = logger({ name: "Intervall", logLevel: configs.general.env === "development" ? 0 : 1 });

export function createInterval(name: string, interval: number, fun: () => unknown) {
  log.info(`Registering Interval ${name} which runs every ${formatTime(interval)}`);
  setTimeout(() => {
    fun();
    setInterval(() => {
      fun();
    }, interval);
  }, interval - (Date.now() % interval));
}

export default createInterval;
