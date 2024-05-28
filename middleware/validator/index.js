import { STATUS_CODES, apiResponseStruct } from "../../utils/apiUtils/index.js";
import logger from "../../utils/logger/index.js";

function validateData(schema) {
	return (req, res, next) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error) {
				const errorMessages = error.errors.map((issue) => ({
					message: `${issue.path.join(".")} - ${issue.message}`,
				}));
				logger.error("Validation error", errorMessages);
				return res.status(STATUS_CODES.BAD_REQUEST).json(
					apiResponseStruct.failure({
						message: errorMessages?.[0]?.message ?? "Invalid data",
						displayMessage: "Please check the data format you have sent",
					})
				);
			}
			res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(
				apiResponseStruct.failure({
					message: "Internal Server Error",
					displayMessage: "Something went wrong",
				})
			);
		}
	};
}

export default validateData;
