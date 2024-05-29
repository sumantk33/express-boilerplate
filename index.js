import { env } from "./utils/env/index.js";
import app from "./server.js";
import logger from "./utils/logger/index.js";

let server = app.listen(env.PORT, () => {
	console.log(`Express server running on port ${env.PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error('Application error', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received', {});
  if (server) {
    server.close();
  }
});