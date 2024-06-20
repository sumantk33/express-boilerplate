import circularJson from 'circular-json';
import moment from 'moment';
import { HEADERS } from './enums.js';
import { env } from './env-util.js';
import ctx from '../lib/context.js';

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

export const LOGGER_TYPES = {
  DEBUG: 'debug',
  ERROR: 'error',
  INFO: 'info',
  LOG: 'log',
};

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

  /**
   * Logging util function
   * @param {string} type
   * @param {Object} logObject
   * @returns {void}
   */
  static logMessage(type, logObject) {
    const logData = {
      level: type,
      ...logObject,
      message: `---${logObject.message.toUpperCase()}---`,
      timestamp: moment().format(timestampFormat),
      [HEADERS.REQUEST_ID]: ctx.get(HEADERS.REQUEST_ID),
      [HEADERS.USER_AGENT]: ctx.get(HEADERS.USER_AGENT),
    };
    console[type](circularJson.stringify(logData));
  }
}

export default logger;
