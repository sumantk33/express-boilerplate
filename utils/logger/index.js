import circularJson from 'circular-json';
import moment from 'moment';
import { HEADERS } from '../enums.js';
import httpContext from '../context/index.js';

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const LOGGER_TYPES = {
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
    if (process.env.NODE_ENV === 'production') return;
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
      logType: type,
      ...logObject,
      timestamp: moment().format(timestampFormat),
      [HEADERS.RESPONSE_ID]: httpContext.get(HEADERS.RESPONSE_ID),
      [HEADERS.REQUEST_ID]: httpContext.get(HEADERS.REQUEST_ID),
      [HEADERS.USER_AGENT]: httpContext.get(HEADERS.USER_AGENT),
    }
    console[type](circularJson.stringify(logData));
  }
}

export default logger;