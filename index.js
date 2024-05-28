import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import z from "zod";
import validateData from "./middleware/validator/index.js";
import expressHealthcheck from "express-healthcheck";
import logger from "./utils/logger/index.js";
import { logRequest } from "./middleware/initMiddleware/index.js";
import { STATUS_CODES, apiResponseStruct } from "./utils/apiUtils/index.js";
import httpContext from "./utils/context/index.js";

const app = express();
const port = 3000;

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

app.use(httpContext.middleware);

app.use(logRequest);

app.use("/healthcheck", expressHealthcheck());

const userLoginSchema = z.object({
	username: z.string(),
	password: z.string().min(8),
});

app.post("/", validateData(userLoginSchema), (req, res) => {
	res.status(STATUS_CODES.OK).json(
		apiResponseStruct.success({
			message: "Data received",
			data: req.body,
		})
	);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
