"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const node_path_1 = __importDefault(require("node:path"));
const winston_1 = __importDefault(require("winston"));
const logDirectory = node_path_1.default.join(__dirname, '../../logs');
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]:${message}`;
    })),
    transports: [
        new winston_1.default.transports.File({ filename: node_path_1.default.join(logDirectory, 'error.log'), level: 'error' }),
        new winston_1.default.transports.File({ filename: node_path_1.default.join(logDirectory, 'combined.log') }),
    ],
});
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
    }));
}
