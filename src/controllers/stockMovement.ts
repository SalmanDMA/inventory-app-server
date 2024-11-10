import { Request, Response } from 'express';
import { StockMovementService } from '../services/stockMovement';
import { successResponse, errorResponse } from '../utils/response';

const stockMovementService = new StockMovementService();

export const getStockMovements = async (req: Request, res: Response): Promise<void> => {
	try {
		const stockMovements = await stockMovementService.getStockMovements();
		successResponse(res, 'Stock movements retrieved successfully', 200, stockMovements);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};

export const getStockMovementById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const stockMovement = await stockMovementService.getStockMovementById(id);
		successResponse(res, 'StockMovement retrieved successfully', 200, stockMovement);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};

export const createStockMovement = async (req: Request, res: Response): Promise<void> => {
	try {
		const stockMovement = await stockMovementService.createStockMovement(req.body);
		successResponse(res, 'StockMovement created successfully', 201, stockMovement);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};

export const updateStockMovement = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const dataToSend = {
			...req.body,
			stockMovementId: id,
		};
		const stockMovement = await stockMovementService.updateStockMovement(dataToSend);
		successResponse(res, 'StockMovement updated successfully', 200, stockMovement);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};

export const softDeleteStockMovements = async (req: Request, res: Response): Promise<void> => {
	try {
		const { ids } = req.body;
		await stockMovementService.softDeleteStockMovements(ids);
		successResponse(res, 'Stock movements deleted successfully', 200);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};

export const restoreStockMovements = async (req: Request, res: Response): Promise<void> => {
	try {
		const { ids } = req.body;
		await stockMovementService.restoreStockMovements(ids);
		successResponse(res, 'Stock movements restored successfully', 200);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};

export const forceDeleteStockMovements = async (req: Request, res: Response): Promise<void> => {
	try {
		const { ids } = req.body;
		await stockMovementService.forceDeleteStockMovements(ids);
		successResponse(res, 'Stock movements deleted successfully', 200);
	} catch (error) {
		const errorMessage = (error as Error).message || 'Something went wrong';
		errorResponse(res, errorMessage);
	}
};
