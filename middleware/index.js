import { CONSTANTS } from "../config/enums.js";
import { STATUS_CODES, apiResponseStruct } from "../utils/apiUtils/index.js";
import logger from "../utils/logger/index.js";

function routeNotAvailable(_, res) {
  res.status(STATUS_CODES.NOT_FOUND).json(
		apiResponseStruct.failure({
			message: "API route not available",
		})
	);
}

function errorHandler(err, req, res, next) {
  logger.error(err.message, err.stack);
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
    apiResponseStruct.failure({
      message: err.message || CONSTANTS.INTERNAL_SERVER_ERROR,
      displayMessage: CONSTANTS.INTERNAL_SERVER_ERROR,
    })
  );
}

export { routeNotAvailable, errorHandler };
