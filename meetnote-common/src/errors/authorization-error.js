"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class AuthorizationError extends custom_error_1.CustomError {
    constructor(message = 'Not Authorized') {
        super(message);
        this.message = message;
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.AuthorizationError = AuthorizationError;
