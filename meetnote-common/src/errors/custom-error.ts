import { StatusCodes } from 'http-status-codes';

export abstract class CustomError extends Error {
  abstract statusCode: StatusCodes;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
