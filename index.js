import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import z from "zod";
import expressHealthcheck from "express-healthcheck";

import validateData from "./middleware/validator/index.js";
import { logRequest } from "./middleware/initMiddleware/index.js";
import { STATUS_CODES, apiResponseStruct } from "./utils/apiUtils/index.js";
import ctx from "./utils/context/index.js";
import { env } from "./utils/env/index.js";
import { errorHandler, routeNotAvailable } from "./middleware/index.js";

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// enable cors
app.use(cors());
app.options("*", cors());

app.use(ctx.middleware);

app.use(logRequest);

app.use("/healthcheck", expressHealthcheck());

const userLoginSchema = z.object({
	username: z.string(),
	password: z.string().min(8),
});

app.post("/login", validateData(userLoginSchema), (req, res, next) => {
	res.status(STATUS_CODES.OK).json(
		apiResponseStruct.success({
			message: "Data received",
			data: req.body,
		})
	);
});

app.use(routeNotAvailable);
app.use(errorHandler);

app.listen(env.PORT, () => {
	console.log(`Example app listening on port ${env.PORT}`);
});
