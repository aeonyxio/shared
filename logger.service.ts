import * as log from "https://deno.land/std@0.176.0/log/mod.ts";

log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: (rec) =>
        `${rec.loggerName}|${rec.datetime}|${rec.levelName}: ${rec.msg}`,
    }),
  },

  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

export { getLogger } from "https://deno.land/std@0.176.0/log/mod.ts";
