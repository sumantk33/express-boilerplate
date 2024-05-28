import Joi from "joi";
import { STATUS_CODES, apiResponseStruct } from "../../utils/apiUtils/index.js";
import { pick } from "../../utils/index.js";

const validateData = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return res.status(STATUS_CODES.BAD_REQUEST).json(
			apiResponseStruct.failure({
				message: errorMessage,
			})
		)
  }
  Object.assign(req, value);
  return next();
};

export default validateData;
