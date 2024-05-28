import httpContext from "../context/index.js";
import { HEADERS } from "../enums.js";
import logger from "../logger/index.js";

const STATUS_CODES = {
	OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
  FORBIDDEN: 403,
	NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
	INTERNAL_SERVER_ERROR: 500,
};

function apiResponseFormat({
	data = null,
	message,
	displayMessage,
	success = true,
}) {
	const responseFormat = {
		data,
		meta: {
			message,
			displayMessage: displayMessage ?? message,
      [HEADERS.REQUEST_ID]: httpContext.get(HEADERS.REQUEST_ID),
      [HEADERS.RESPONSE_ID]: httpContext.get(HEADERS.RESPONSE_ID),
			success,
		},
	};

	logger.log("Response struct", responseFormat);
	return responseFormat;
}

const apiResponseStruct = {
	success: (props) =>
		apiResponseFormat({ ...props, success: true }),
	failure: (props) =>
		apiResponseFormat({ ...props, success: false, data: null }),
};

export { apiResponseStruct, STATUS_CODES };
