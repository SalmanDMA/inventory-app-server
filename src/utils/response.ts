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

export const errorResponse = (res: Response, message: string, status = 500): Response => {
  const responseData: ResponseData<null> = {
    success: false,
    message,
  };

  if (message.toLowerCase().includes('foreign key constraint')) {
    responseData.message = 'Cannot delete data as it is in use in other tables.';
  }

  return res.status(status).json(responseData);
};
