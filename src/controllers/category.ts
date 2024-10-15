import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { CategoryService } from '../services/category';

const categoryService = new CategoryService();

export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.getCategories();
    successResponse(res, 'Categories retrieved successfully', 200, categories);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(parseInt(id, 10));
    successResponse(res, 'Category retrieved successfully', 200, category);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await categoryService.createCategory(req.body);
    successResponse(res, 'Category created successfully', 201, category);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      categoryId: id,
    };
    const category = await categoryService.updateCategory(dataToSend);
    successResponse(res, 'Category updated successfully', 200, category);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await categoryService.softDeleteCategories(ids);
    successResponse(res, 'Categories deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await categoryService.restoreCategories(ids);
    successResponse(res, 'Categories restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await categoryService.forceDeleteCategories(ids);
    successResponse(res, 'Categories deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
