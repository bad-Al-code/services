import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { ValidationError } from '../errors/validation-error';

interface ValidateRequest {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
}

export const validateRequest = (schema: ValidateRequest) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.body = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.body = await schema.params.parseAsync(req.params);
      }

      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const validationError = ValidationError.fromZodError(error);

        next(validationError);
      } else {
        next(error);
      }
    }
  };
};
