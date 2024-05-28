import express from 'express';
import validateData from '../../middleware/validator/index.js';
import Joi from 'joi';
import { STATUS_CODES, apiResponseStruct } from '../../utils/apiUtils/index.js';
import logger from '../../utils/logger/index.js';

const router = express.Router();

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const reqBodySchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

router.post("/login", validateData(reqBodySchema), (req, res) => {
	res.status(STATUS_CODES.OK).json(
		apiResponseStruct.success({
			message: "Data received",
			data: req.body,
		})
	);
});

router.post("/logger", (req, res) => {
  logger.log("Logging body", req.body);
  res.status(STATUS_CODES.OK).json(
    apiResponseStruct.success({
      message: "Logged successfully",
    })
  );
})

export default router;