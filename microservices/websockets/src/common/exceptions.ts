import { Errors } from "../enums/errors.enum";
import { Exception } from "./exception";

export class BadRequestException extends Exception {
  constructor(message?: string) {
    super({
      message: message || Errors.BAD_REQUEST,
      status: 400,
    });
  }
}

export class UnauthorizedException extends Exception {
  constructor(message?: string) {
    super({
      message: message || Errors.AUTH_COMMON,
      status: 401,
    });
  }
}

export class TooManyRequests extends Exception {
  constructor(message?: string) {
    super({
      message: message || Errors.TOO_MANY_REQEUSTS,
      status: 429,
    });
  }
}

export class InternalException extends Exception {
  constructor(message?: string) {
    super({
      message: message || Errors.INTERNAL_SERVER_ERROR,
      status: 500,
    });
  }
}
