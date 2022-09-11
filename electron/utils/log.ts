import logger from "electron-log";
import { app } from "electron";

logger.transports.file.level = "debug";
logger.transports.file.maxSize = 1002430; // 10M
logger.transports.file.format =
  "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";
const date = new Date();
const now_date =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
logger.transports.file.file =
  app.getPath("userData") + "\\logs\\" + now_date + ".log";
logger.transports.console.level = false;
export default {
  logger,
  info(param) {
    logger.info(param);
  },
  warn(param) {
    logger.warn(param);
  },
  error(param) {
    logger.error(param);
  },
};
