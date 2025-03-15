"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class AuthenticationError extends custom_error_1.CustomError {
    constructor(message = 'Authentication failed') {
        super(message);
        this.message = message;
        this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.AuthenticationError = AuthenticationError;
