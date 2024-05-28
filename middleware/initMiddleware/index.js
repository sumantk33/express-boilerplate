import { v4 as uuidv4 } from 'uuid';
import { HEADERS } from '../../utils/enums.js';
import logger from '../../utils/logger/index.js';
import ctx from '../../utils/context/index.js';

function logRequest(req, res, next) {
  ctx.set(HEADERS.RESPONSE_ID, uuidv4());
  ctx.set(HEADERS.REQUEST_ID, req.headers[HEADERS.REQUEST_ID] || null);
  ctx.set(HEADERS.USER_AGENT, req.headers[HEADERS.USER_AGENT] || null);
  logger.log('Request log', {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
  })
  next();
}

export { logRequest };