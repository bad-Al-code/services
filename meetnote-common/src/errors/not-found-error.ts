import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode: StatusCodes = StatusCodes.NOT_FOUND;

  constructor(public message: string = 'Resounce not found') {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
