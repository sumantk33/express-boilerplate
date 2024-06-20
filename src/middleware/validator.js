import Joi from 'joi';

import { pick } from '../utils/common-utils.js';
import logger from '../utils/logger-util.js';
import { STATUS_CODES } from '../utils/enums.js';

/**
 * Validates the req data against the schema
 * @param {Schema} schema
 * @returns {void}
 */
const validateData = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ');
    logger.error('Validation error', { errorMessage, object });
    return res.apiResponse(
      STATUS_CODES.BAD_REQUEST,
      {
        message: errorMessage,
      },
      true
    );
  }
  Object.assign(req, value);
  return next();
};

export default validateData;
