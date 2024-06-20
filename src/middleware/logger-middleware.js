import { v4 as uuidv4 } from 'uuid';
import { HEADERS } from '../utils/enums.js';
import logger from '../utils/logger-util.js';
import ctx from '../lib/context.js';

/**
 * Logs each request and adds headers to ctx
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
function logRequest(req, res, next) {
  const requestId = req.headers[HEADERS.REQUEST_ID] || uuidv4();
  ctx.set(HEADERS.REQUEST_ID, requestId);
  ctx.set(HEADERS.USER_AGENT, req.headers[HEADERS.USER_AGENT] || null);
  res.set(HEADERS.REQUEST_ID, requestId);
  logger.log('Request', {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
  });
  next();
}

export { logRequest };
