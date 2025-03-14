import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor(public message: string = 'Bad Request') {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
