import ctx from "../context/index.js";
import { HEADERS } from "../enums.js";
import logger, { LOGGER_TYPES } from "../logger/index.js";

const API_RESPONSE_TYPES = {
	SUCCESS: "success",
	FAILURE: "failure",
};

const STATUS_CODES = {
	// 2xx
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,

	// 4xx
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	TOO_MANY_REQUESTS: 429,

	// 5xx
	INTERNAL_SERVER_ERROR: 500,
};

/**
 * Construct the response format for the API
 * @param {Object} data - Data object to be sent in the response
 * @param {string} message
 * @param {string} displayMessage
 * @param {bool} success
 * @returns {Object} responseFormat - The formatted API response
 */
function apiResponseFormat({
	data = null,
	message,
	displayMessage,
	success = true,
}) {
	const responseFormat = {
		data,
		meta: {
			message: displayMessage ?? message,
			success,
		},
	};

	const logResponseFormat = {
		...responseFormat,
		meta: {
			...responseFormat.meta,
			data: null,
			requestId: ctx.get(HEADERS.REQUEST_ID),
			logMessage: message,
		},
	};

	let loggerType = LOGGER_TYPES.LOG;
	if (!success) {
		loggerType = LOGGER_TYPES.ERROR;
	}

	logger[loggerType]("Response", logResponseFormat);
	return responseFormat;
}

const apiResponseStruct = {
	[API_RESPONSE_TYPES.SUCCESS]: (props) =>
		apiResponseFormat({ ...props, success: true }),
	[API_RESPONSE_TYPES.FAILURE]: (props) =>
		apiResponseFormat({ ...props, success: false }),
};

export { apiResponseStruct, STATUS_CODES, API_RESPONSE_TYPES };
