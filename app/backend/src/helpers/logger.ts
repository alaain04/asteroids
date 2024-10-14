import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }: any) => {
  const msg: string =
    typeof message === "string" ? message : JSON.stringify(message);
  return `${timestamp} [${level.toUpperCase()}] ${msg}`;
});

const LOGGER = createLogger({
  level: "debug",
  format: combine(label({ label: "DEBUG" }), timestamp(), myFormat),
  transports: [new transports.Console()],
});

LOGGER.info("Debugger log level: " + LOGGER.level);
export default LOGGER;
