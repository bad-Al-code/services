"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor(message = 'Resounce not found') {
        super(message);
        this.message = message;
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.NotFoundError = NotFoundError;
