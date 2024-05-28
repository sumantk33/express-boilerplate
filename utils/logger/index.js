import circularJson from 'circular-json';
import moment from 'moment';
import { HEADERS } from '../enums.js';
import ctx from '../context/index.js';
import { env } from '../env/index.js';

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

export const LOGGER_TYPES = {
  DEBUG: 'debug',
  ERROR: 'error',
  INFO: 'info',
  LOG: 'log',
}

class logger {
  static log(message, data) {
    this.logMessage(LOGGER_TYPES.LOG, { message, data });
  }

  static debug(message, data) {
    if (env.isProdEnv) return;
    this.logMessage(LOGGER_TYPES.DEBUG, { message, data });
  }

  static error(message, data) {
    this.logMessage(LOGGER_TYPES.ERROR, { message, data });
  }

  static info(message, data) {
    this.logMessage(LOGGER_TYPES.INFO, { message, data });
  }

  static logMessage(type, logObject) {
    const logData = {
      level: type,
      ...logObject,
      timestamp: moment().format(timestampFormat),
      [HEADERS.RESPONSE_ID]: ctx.get(HEADERS.RESPONSE_ID),
      [HEADERS.REQUEST_ID]: ctx.get(HEADERS.REQUEST_ID),
      [HEADERS.USER_AGENT]: ctx.get(HEADERS.USER_AGENT),
    }
    console[type](circularJson.stringify(logData));
  }
}

export default logger;