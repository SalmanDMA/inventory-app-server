import { Request, Response } from 'express';
import { WarehouseService } from '../services/warehouse';
import { successResponse, errorResponse } from '../utils/response';

const warehouseService = new WarehouseService();

export const getWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const warehouses = await warehouseService.getWarehouses();
    successResponse(res, 'Warehouses retrieved successfully', 200, warehouses);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getWarehouseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const warehouse = await warehouseService.getWarehouseById(id);
    successResponse(res, 'Warehouse retrieved successfully', 200, warehouse);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createWarehouse = async (req: Request, res: Response): Promise<void> => {
  try {
    const warehouse = await warehouseService.createWarehouse(req.body);
    successResponse(res, 'Warehouse created successfully', 201, warehouse);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateWarehouse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      warehouseId: id,
    };
    const warehouse = await warehouseService.updateWarehouse(dataToSend);
    successResponse(res, 'Warehouse updated successfully', 200, warehouse);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await warehouseService.softDeleteWarehouses(ids);
    successResponse(res, 'Warehouses deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await warehouseService.restoreWarehouses(ids);
    successResponse(res, 'Warehouses restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteWarehouses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await warehouseService.forceDeleteWarehouses(ids);
    successResponse(res, 'Warehouses deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
