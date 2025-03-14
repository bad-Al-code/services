import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class AuthorizationError extends CustomError {
  statusCode: StatusCodes = StatusCodes.FORBIDDEN;

  constructor(public message: string = 'Not Authorized') {
    super(message);

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
