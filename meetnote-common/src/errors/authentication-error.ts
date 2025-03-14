import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class AuthenticationError extends CustomError {
  statusCode: StatusCodes = StatusCodes.UNAUTHORIZED;

  constructor(public message: string = 'Authentication failed') {
    super(message);

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
