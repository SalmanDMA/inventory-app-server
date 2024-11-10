import { Request, Response } from 'express';
import { ProductService } from '../services/product';
import { successResponse, errorResponse } from '../utils/response';

const productService = new ProductService();

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getProducts();
    successResponse(res, 'Products retrieved successfully', 200, products);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    successResponse(res, 'Product retrieved successfully', 200, product);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body, req.user);
    successResponse(res, 'Product created successfully', 201, product);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      productId: id,
    };
    const product = await productService.updateProduct(dataToSend, req.user);
    successResponse(res, 'Product updated successfully', 200, product);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await productService.softDeleteProducts(ids);
    successResponse(res, 'Products deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await productService.restoreProducts(ids);
    successResponse(res, 'Products restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await productService.forceDeleteProducts(ids);
    successResponse(res, 'Products deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
