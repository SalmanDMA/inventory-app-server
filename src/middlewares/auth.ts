import { NextFunction, Request, Response } from 'express';
import AuthenticationError from '../exeptions/AuthenticationError';
import { IPayload, verifyToken } from '../utils/tokenize';

declare global {
  namespace Express {
    interface Request {
      user: IPayload;
    }
  }
}

const authCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1] || '';

  if (!token) {
    throw new AuthenticationError('Invalid token. Please login.');
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    throw new AuthenticationError('Invalid token. Please make sure you are logged in.');
  } else {
    req.user = decodedToken;
    next();
  }
};

export { authCheck };
