import { Request, Response } from 'express';
import InvariantError from '../exeptions/InvariantError';
import { handleRemoveImage, handleUploadImage } from '../services/cloudinary';
import { errorResponse, successResponse } from '../utils/response';

const uploadImage = async (req: Request, res: Response) => {
  try {
    const result = await handleUploadImage(req.body);
    successResponse(res, 'Image uploaded successfully', 200, result);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

const removeImage = async (req: Request, res: Response) => {
  try {
    const imageId = req.body.public_id;
    const data = await handleRemoveImage(imageId);

    if (data.result !== 'ok') {
      throw new InvariantError('Image not found');
    }

    successResponse(res, 'Image deleted successfully', 200, data);
  } catch (error) {
    errorResponse(res, (error as Error).message);
  }
};

export { uploadImage, removeImage };
