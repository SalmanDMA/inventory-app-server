import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import InvariantError from '../exeptions/InvariantError';

dotenv.config();

export interface IGenerateToken {
  payload: {
    id: string;
    role: string;
  };
  expiresIn: number;
}

export interface IPayload {
  id: string;
  role: string;
}

const generateToken = ({ payload, expiresIn }: IGenerateToken): string => {
  const token = jwt.sign(payload as object, process.env.JWT_SECRET_KEY as string, { expiresIn });
  return token;
};

const verifyToken = (token: string): IPayload => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as IPayload;
    return payload;
  } catch (error) {
    throw new InvariantError('Invalid token or expired token. Please try again.');
  }
};

export { generateToken, verifyToken };
