import logger from "electron-log";
import { app } from "electron";
import path from "path";

logger.transports.file.level = "debug";
logger.transports.file.maxSize = 1002430; // 10M
logger.transports.file.format =
  "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";

const date = new Date();
const now_date =
  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

const userDataPath = app.getPath("userData");
const logFolder = path.join(userDataPath, "logs");

logger.transports.file.file = logFolder + now_date + ".log";
logger.transports.console.level = false;

export default {
  logger,
  logFolder,
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
