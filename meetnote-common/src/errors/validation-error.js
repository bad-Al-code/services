"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class ValidationError extends custom_error_1.CustomError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    static fromZodError(zodError) {
        const errors = zodError.errors.map((issue) => {
            const field = issue.path.length > 0 ? issue.path[issue.path.length - 1].toString() : undefined;
            return { message: issue.message, field };
        });
        return new ValidationError(errors);
    }
    serializeErrors() {
        return this.errors;
    }
}
exports.ValidationError = ValidationError;
