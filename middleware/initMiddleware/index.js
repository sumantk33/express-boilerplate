import { v4 as uuidv4 } from 'uuid';
import { HEADERS } from '../../utils/enums.js';
import logger from '../../utils/logger/index.js';
import httpContext from '../../utils/context/index.js';

function logRequest(req, res, next) {
  httpContext.set(HEADERS.REQUEST_ID, req.headers[HEADERS.REQUEST_ID] || null);
  httpContext.set(HEADERS.RESPONSE_ID, uuidv4());
  httpContext.set(HEADERS.USER_AGENT, req.headers[HEADERS.USER_AGENT] || null);
  logger.log('Request struct', {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
  })
  next();
}

export { logRequest };