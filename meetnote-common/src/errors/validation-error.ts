import { StatusCodes } from 'http-status-codes';
import { CustomError } from './custom-error';
import { ZodError, ZodIssue } from 'zod';

export class ValidationError extends CustomError {
  statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor(public errors: { message: string; field?: string }[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  static fromZodError(zodError: ZodError): ValidationError {
    const errors: { message: string; fields?: string }[] = zodError.errors.map((issue: ZodIssue) => {
      const field = issue.path.length > 0 ? issue.path[issue.path.length - 1].toString() : undefined;

      return { message: issue.message, field };
    });

    return new ValidationError(errors);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return this.errors;
  }
}
