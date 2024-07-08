export enum Errors {
  // Common
  INTERNAL_SERVER_ERROR = "Internal server error",

  // Auth
  AUTH_COMMON = "authorization error",
  JWT_NOT_VALID = "not valid jwt token provided inside Authrization header",
  JWT_NOT_PROVIDED = "not jwt token provided inside Authrization header",
  INTERAPP_NOT_VALID = "Interapp token not valid not valid or not provided",

  // Vadlidation
  JSON_PARSE_ERROR = "Failed to parse JSON",
  BAD_REQUEST = "Bad request",
  NOT_VALID = "Validation failed",

  // Connections
  TOO_MANY_REQEUSTS = "Too many requests",
  TOO_MANY_CONNECTIONS = "Too many connections",
}
