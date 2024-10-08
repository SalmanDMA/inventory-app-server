import { Response } from 'express';

type ResponseData<T> = {
  success: boolean;
  message: string;
  status?: number;
  data?: T;
  error?: string;
};

export const successResponse = <T>(res: Response, message: string, status = 200, data?: T): Response => {
  const responseData: ResponseData<T> = {
    success: true,
    message,
    data,
  };
  return res.status(status).json(responseData);
};

export const errorResponse = (res: Response, message: string): Response => {
  const responseData: ResponseData<null> = {
    success: false,
    message,
  };
  return res.status(500).json(responseData);
};
