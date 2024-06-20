# Restful API ExpressJs Server Boilerplate

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## About

A boilerplate/starter project for quickly building RESTful APIs using Node.js and Express. The app has support for features like logging, request validation etc.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/sumantk33/expressjs-test.git
cd expressjs-test
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
touch .env

# open .env and modify the environment variables (if needed)
```

## Features

- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using custom logger
- **Error handling**: centralized error handling mechanism
- **Dependency management**: with [Npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Linting:

```bash

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

#ENV type
NODE_ENV=
# URL of the Mongo DB
```

## Project Structure

```
src\
 |--index.js        # App entry point
 |--server.js       # Express server
 |--lib\            # External dependancies
 |--middlewares\    # Custom express middlewares
 |--routers\        # Custom express Route
 |--utils\          # Utility classes and functions
```

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "data": null,
  "meta": {
    "message": "Internal server error",
    "success": false
  }
}
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

```javascript
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'password must contain at least 1 letter and 1 number'
    );
  }
  return value;
};

const reqBodySchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

router.post('/login', validateData(reqBodySchema), (req, res) => {
  res.apiResponse(STATUS_CODES.OK, {
    message: 'Data received',
    data: req.body,
  });
});
```

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/utils/loger-utils.js');

logger.error('message');
logger.info('message');
logger.log('message');
logger.debug('message');
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `error`, and `log` logs will be printed to the console.\

## API response format

Custom API format is as below, which can be changed in `src\utils\api-utils.js`

```javascript
{
  data: {
    email: "***",
    password: "***"
  },
  meta: {
    message: "Success",
    success: true
  }
}
```

## Custom res.send() function

Custom apiResponse has been implemented which accepts two mandatory params and one optional param. FIrst param is the status param and the second one is the res.data object which needs to be sent. Third optional one is the flag to indicate whether the API response is a failure or not.

```javascript
res.apiResponse(STATUS_CODES.OK, {
  message: 'Data received',
  data: req.body,
});
```

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications. It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslint.config.js` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Inspirations

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate/tree/mastere)

## License

[ISC](LICENSE)
