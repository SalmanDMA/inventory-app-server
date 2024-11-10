import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { StockMovementRepository } from '../repositories/stockMovement';
import { IStockMovement } from '../types/model';
import { v4 as uuidv4 } from 'uuid';
import { getUpdatedFields } from '../utils/common';
import { WarehouseRepository } from '../repositories/warehouse';
import { ProductRepository } from '../repositories/product';

const stockMovementRepository = new StockMovementRepository();
const warehouseRepository = new WarehouseRepository();
const productRepository = new ProductRepository();

export class StockMovementService {
	async getStockMovements() {
		return await stockMovementRepository.getAllStockMovements();
	}

	async getStockMovementById(id: string) {
		const stockMovement = await stockMovementRepository.getStockMovementById(id);

		if (!stockMovement) {
			throw new NotFoundError('Stock movement not found, please register first');
		}

		return stockMovement;
	}

	async updateStockMovement(stockMovement: IStockMovement) {
		const stockMovementData = await stockMovementRepository.getStockMovementById(stockMovement.stockMovementId);

		if (!stockMovementData) {
			throw new NotFoundError('Stock movement not found, please register first');
		}

		const updatedFields = getUpdatedFields(stockMovement, stockMovementData);

		if (updatedFields.productId && updatedFields.productId !== stockMovementData.productId) {
			const productData = await productRepository.getProductById(updatedFields.productId as string);
			if (!productData) {
				throw new NotFoundError('Product not found, please register first');
			}

			if (updatedFields.quantity && updatedFields.quantity > productData.stock) {
				throw new InvariantError('Stock movement quantity is greater than product stock, please check again');
			}
		}

		if (updatedFields.warehouseId && updatedFields.warehouseId !== stockMovementData.warehouseId) {
			const warehouseData = await warehouseRepository.getWarehouseById(updatedFields.warehouseId as string);
			if (!warehouseData) {
				throw new NotFoundError('Warehouse not found, please register first');
			}

			if (updatedFields.quantity && updatedFields.quantity > warehouseData.capacity) {
				throw new InvariantError(
					'Stock movement quantity is greater than warehouse capacity, please check again'
				);
			}

			warehouseData.capacity += stockMovementData.quantity;
			warehouseData.capacity -= updatedFields.quantity as number;
			await warehouseRepository.updateWarehouse(warehouseData);
		}

		if (Object.keys(updatedFields).length === 0) {
			return stockMovementData;
		}

		const updatedStockMovement = await stockMovementRepository.updateStockMovement({
			...stockMovementData,
			...updatedFields,
		});

		return updatedStockMovement;
	}

	async createStockMovement(stockMovement: IStockMovement) {
		const productData = await productRepository.getProductById(stockMovement.productId);

		if (!productData) {
			throw new NotFoundError('Product not found, please register first');
		}

		if (stockMovement.quantity > productData.stock) {
			throw new InvariantError('Stock movement quantity is greater than product stock, please check again');
		}

		const warehouseData = await warehouseRepository.getWarehouseById(stockMovement.warehouseId);

		if (!warehouseData) {
			throw new NotFoundError('Warehouse not found, please register first');
		}

		if (stockMovement.quantity > warehouseData.capacity) {
			throw new InvariantError('Stock movement quantity is greater than warehouse capacity, please check again');
		}

		warehouseData.capacity -= stockMovement.quantity;
		await warehouseRepository.updateWarehouse(warehouseData);

		const createdStockMovement = await stockMovementRepository.createStockMovement(stockMovement);

		return createdStockMovement;
	}

	async softDeleteStockMovements(stockMovementIds: string[]) {
		for (const stockMovementId of stockMovementIds) {
			const stockMovementData = await stockMovementRepository.getStockMovementById(stockMovementId);
			if (!stockMovementData) {
				throw new NotFoundError(`StockMovement with ID ${stockMovementId} not found, please register first`);
			}

			await stockMovementRepository.softDelete(stockMovementData.stockMovementId);
		}
	}

	async restoreStockMovements(stockMovementIds: string[]) {
		for (const stockMovementId of stockMovementIds) {
			const stockMovementData = await stockMovementRepository.getStockMovementById(stockMovementId);
			if (!stockMovementData) {
				throw new NotFoundError(`StockMovement with ID ${stockMovementId} not found, please register first`);
			}
			await stockMovementRepository.restore(stockMovementData.stockMovementId);
		}
	}

	async forceDeleteStockMovements(stockMovementIds: string[]) {
		for (const stockMovementId of stockMovementIds) {
			const stockMovementData = await stockMovementRepository.getStockMovementById(stockMovementId);
			if (!stockMovementData) {
				throw new NotFoundError(`StockMovement with ID ${stockMovementId} not found, please register first`);
			}

			const warehouseData = await warehouseRepository.getWarehouseById(stockMovementData.warehouseId);

			if (!warehouseData) {
				throw new NotFoundError('Warehouse not found, please register first');
			}

			warehouseData.capacity += stockMovementData.quantity;
			await warehouseRepository.updateWarehouse(warehouseData);

			await stockMovementRepository.forceDelete(stockMovementData.stockMovementId);
		}
	}
}
