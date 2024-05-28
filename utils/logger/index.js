import circularJson from 'circular-json';
import moment from 'moment';
import { HEADERS } from '../enums.js';

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const LOGGER_TYPES = {
  DEBUG: 'debug',
  ERROR: 'error',
  INFO: 'info',
  LOG: 'log',
}

class logger {
  static log(message, data, res) {
    this.logMessage(LOGGER_TYPES.LOG, { message, data }, res);
  }

  static debug(message, data, res) {
    if (process.env.NODE_ENV === 'production') return;
    this.logMessage(LOGGER_TYPES.DEBUG, { message, data }, res);
  }

  static error(message, data, res) {
    this.logMessage(LOGGER_TYPES.ERROR, { message, data }, res);
  }

  static info(message, data, res) {
    this.logMessage(LOGGER_TYPES.INFO, { message, data }, res);
  }

  static logMessage(type, logObject, res) {
    const logData = {
      logType: type,
      ...logObject,
      timestamp: moment().format(timestampFormat),
      ...(res ? {
        [HEADERS.RESPONSE_ID]: res.locals[HEADERS.RESPONSE_ID],
        [HEADERS.REQUEST_ID]: res.locals[HEADERS.REQUEST_ID],
        [HEADERS.USER_AGENT]: res.locals[HEADERS.USER_AGENT],
      } : {})
    }
    console[type](circularJson.stringify(logData));
  }
}

export default logger;