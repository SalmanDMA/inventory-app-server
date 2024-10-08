import { Request, Response, NextFunction } from 'express';
import ClientError from '../exeptions/ClientError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
  return next();
};

export default errorHandler;
