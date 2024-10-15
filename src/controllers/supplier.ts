import { Request, Response } from 'express';
import { SupplierService } from '../services/supplier';
import { successResponse, errorResponse } from '../utils/response';

const supplierService = new SupplierService();

export const getSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await supplierService.getSuppliers();
    successResponse(res, 'Suppliers retrieved successfully', 200, suppliers);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const supplier = await supplierService.getSupplierById(id);
    successResponse(res, 'Supplier retrieved successfully', 200, supplier);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    successResponse(res, 'Supplier created successfully', 201, supplier);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      supplierId: id,
    };
    const supplier = await supplierService.updateSupplier(dataToSend);
    successResponse(res, 'Supplier updated successfully', 200, supplier);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await supplierService.softDeleteSuppliers(ids);
    successResponse(res, 'Suppliers deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await supplierService.restoreSuppliers(ids);
    successResponse(res, 'Suppliers restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await supplierService.forceDeleteSuppliers(ids);
    successResponse(res, 'Suppliers deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
