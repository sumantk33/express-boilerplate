import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import expressHealthcheck from 'express-healthcheck';
import {
  appendCustomSendFunc,
  errorHandler,
  rateLimiter,
  routeNotAvailable,
} from './middleware/common-middleware.js';
import v1Routes from './routers/v1/index.js';
import { logRequest } from './middleware/logger-middleware.js';
import ctx from './lib/context.js';

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// Init context for each request
app.use(ctx.middleware);

// Log each request and add headers to ctx
app.use(logRequest);

// Add custom send function to response object
app.use(appendCustomSendFunc);

app.use('/healthcheck', expressHealthcheck());

app.use('/api/v1', rateLimiter, v1Routes);

app.use(routeNotAvailable);
app.use(errorHandler);

export default app;
