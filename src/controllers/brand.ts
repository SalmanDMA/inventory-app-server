import { Request, Response } from 'express';
import { BrandService } from '../services/brand';
import { successResponse, errorResponse } from '../utils/response';

const brandService = new BrandService();

export const getBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brands = await brandService.getBrands();
    successResponse(res, 'Brands retrieved successfully', 200, brands);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getBrandById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const brand = await brandService.getBrandById(id);
    successResponse(res, 'Brand retrieved successfully', 200, brand);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const brand = await brandService.createBrand(req.body);
    successResponse(res, 'Brand created successfully', 201, brand);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      brandId: id,
    };
    const brand = await brandService.updateBrand(dataToSend);
    successResponse(res, 'Brand updated successfully', 200, brand);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await brandService.softDeleteBrands(ids);
    successResponse(res, 'Brands deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await brandService.restoreBrands(ids);
    successResponse(res, 'Brands restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await brandService.forceDeleteBrands(ids);
    successResponse(res, 'Brands deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
