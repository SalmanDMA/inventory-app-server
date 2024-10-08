import { FileService } from '../services/file';
import { errorResponse, successResponse } from '../utils/response';

const fileService = new FileService();

export const getFile = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const file = await fileService.getFile(id);
    successResponse(res, 'File retrieved successfully', 200, file);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
