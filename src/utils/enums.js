const HEADERS = {
  REQUEST_ID: 'x-request-id',
  RESPONSE_ID: 'x-response-id',
  USER_AGENT: 'x-user-agent',
};

const CONSTANTS = {
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

const STATUS_CODES = {
  // 2xx
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,

  // 4xx
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  TOO_MANY_REQUESTS: 429,

  // 5xx
  INTERNAL_SERVER_ERROR: 500,
};

export { HEADERS, CONSTANTS, STATUS_CODES };
