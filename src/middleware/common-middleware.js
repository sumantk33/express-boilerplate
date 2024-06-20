import { rateLimit } from 'express-rate-limit';
import { API_RESPONSE_TYPES, apiResponseStruct } from '../utils/api-utils.js';
import logger from '../utils/logger-util.js';
import { CONSTANTS, STATUS_CODES } from '../utils/enums.js';

/**
 * Handles the 404 routes
 * @param {Request} _
 * @param {Response} res
 * @returns {void}
 */
function routeNotAvailable(_, res) {
  res.apiResponse(
    STATUS_CODES.NOT_FOUND,
    {
      message: 'API route not available',
    },
    true
  );
}

/**
 * Error handler middleware for any uncaught errors
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  logger.error(err.message, err.stack);
  res.apiResponse(
    STATUS_CODES.INTERNAL_SERVER_ERROR,
    {
      message: err.message || CONSTANTS.INTERNAL_SERVER_ERROR,
      displayMessage: CONSTANTS.INTERNAL_SERVER_ERROR,
    },
    true
  );
}

const rateLimiter = rateLimit({
  windowMs: 1000, // 1 minute
  limit: 2, // Limit each IP to 2 requests per `window` (here, per minute)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
  handler: (req, res) =>
    res.apiResponse(
      STATUS_CODES.TOO_MANY_REQUESTS,
      {
        message: 'Too many requests sent, please try again later.',
      },
      true
    ),
});

/**
 * Description
 * @param {Request} _
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 */
function appendCustomSendFunc(_, res, next) {
  res.apiResponse = (status, responseBody, isError = false) => {
    res
      .status(status)
      .json(
        apiResponseStruct[
          isError ? API_RESPONSE_TYPES.FAILURE : API_RESPONSE_TYPES.SUCCESS
        ](responseBody)
      );
  };
  next();
}

export { routeNotAvailable, errorHandler, rateLimiter, appendCustomSendFunc };
