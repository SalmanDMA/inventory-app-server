import { ErrorRequestHandler, RequestHandler } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';

// Logger untuk permintaan
export const requestLogger: RequestHandler = expressWinston.logger({
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

// Logger untuk kesalahan
export const errorLogger: ErrorRequestHandler = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});
