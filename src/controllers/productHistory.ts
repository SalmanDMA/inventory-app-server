import { Request, Response } from 'express';
import { ProductHistoryService } from '../services/productHistory';
import { successResponse, errorResponse } from '../utils/response';

const productHistoryService = new ProductHistoryService();

export const getProductHistories = async (req: Request, res: Response): Promise<void> => {
  try {
    const productHistories = await productHistoryService.getProductHistories();
    successResponse(res, 'Product history retrieved successfully', 200, productHistories);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getUniqueProductHistories = async (req: Request, res: Response): Promise<void> => {
  try {
    const productHistories = await productHistoryService.getUniqueProductHistories();
    successResponse(res, 'Product history retrieved successfully', 200, productHistories);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
}

export const getProductHistoriesByProductId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const productHistories = await productHistoryService.getProductHistoriesByProductId(productId);
    successResponse(res, 'Product history retrieved successfully', 200, productHistories);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getProductHistoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const productHistory = await productHistoryService.getProductHistoryById(id);
    successResponse(res, 'Product history retrieved successfully', 200, productHistory);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createProductHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const productHistory = await productHistoryService.createProductHistory(req.body, req.user);
    successResponse(res, 'Product history created successfully', 201, productHistory);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateProductHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      productHistoryId: id,
    };
    const productHistory = await productHistoryService.updateProductHistory(dataToSend, req.user);
    successResponse(res, 'Product history updated successfully', 200, productHistory);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteProductHistories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await productHistoryService.softDeleteProductHistories(ids);
    successResponse(res, 'Product history deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreProductHistories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await productHistoryService.restoreProductHistories(ids);
    successResponse(res, 'Product history restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteProductHistories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await productHistoryService.forceDeleteProductHistories(ids);
    successResponse(res, 'Product history deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
