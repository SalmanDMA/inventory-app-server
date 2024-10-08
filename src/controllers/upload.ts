import { UploadService } from '../services/upload';
import { errorResponse, successResponse } from '../utils/response';

const uploadService = new UploadService();

export const getUploads = async (req: any, res: any) => {
  try {
    const uploads = await uploadService.getUploads();
    successResponse(res, 'Uploads retrieved successfully', 200, uploads);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getUploadById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const upload = await uploadService.getUploadById(id);
    successResponse(res, 'Upload retrieved successfully', 200, upload);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createUpload = async (req: any, res: any) => {
  try {
    const upload = await uploadService.create(req.body);
    successResponse(res, 'Upload created successfully', 201, upload);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateUpload = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      uploadId: id,
    };
    const upload = await uploadService.update(dataToSend);
    successResponse(res, 'Upload updated successfully', 200, upload);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteUpload = async (req: any, res: any) => {
  try {
    const { ids } = req.body;
    const upload = await uploadService.softDelete(ids);
    successResponse(res, 'Upload deleted successfully', 200, upload);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteUpload = async (req: any, res: any) => {
  try {
    const { ids } = req.body;
    const upload = await uploadService.forceDelete(ids);
    successResponse(res, 'Upload deleted successfully', 200, upload);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreUpload = async (req: any, res: any) => {
  try {
    const { ids } = req.body;
    const upload = await uploadService.restore(ids);
    successResponse(res, 'Upload restored successfully', 200, upload);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
