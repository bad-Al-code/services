import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';

export class ValidationError extends CustomError {
  statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor(public errors: { message: string; field: string }[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return this.errors.map((err) => {
      return { message: err.message, field: err.field };
    });
  }
}
