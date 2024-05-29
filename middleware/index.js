import { rateLimit } from "express-rate-limit";
import { CONSTANTS } from "../config/enums.js";
import { STATUS_CODES, apiResponseStruct } from "../utils/apiUtils/index.js";
import logger from "../utils/logger/index.js";

/**
 * Handles the 404 routes
 * @param {Request} _
 * @param {Response} res
 * @returns {void}
 */
function routeNotAvailable(_, res) {
	res.status(STATUS_CODES.NOT_FOUND).json(
		apiResponseStruct.failure({
			message: "API route not available",
		})
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
function errorHandler(err, req, res, next) {
	logger.error(err.message, err.stack);
	res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
		apiResponseStruct.failure({
			message: err.message || CONSTANTS.INTERNAL_SERVER_ERROR,
			displayMessage: CONSTANTS.INTERNAL_SERVER_ERROR,
		})
	);
}

const rateLimiter = rateLimit({
	windowMs: 1000, // 1 minute
	limit: 2, // Limit each IP to 2 requests per `window` (here, per minute)
	standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
	handler: (req, res, next, options) =>
		res.status(STATUS_CODES.TOO_MANY_REQUESTS).json(
			apiResponseStruct.failure({
				message: "Too many requests sent, please try again later.",
			})
		),
});

export { routeNotAvailable, errorHandler, rateLimiter };
