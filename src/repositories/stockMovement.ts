import { PrismaClient } from '@prisma/client';
import { IStockMovement } from '../types/model';

const prisma = new PrismaClient();

export class StockMovementRepository {
	async getAllStockMovements(): Promise<IStockMovement[]> {
		const stockMovements = await prisma.stockMovements.findMany({
			include: {
				product: true,
				warehouse: true,
			},
		});
		return stockMovements as IStockMovement[];
	}

	async getStockMovementById(id: string): Promise<IStockMovement | null> {
		const stockMovement = await prisma.stockMovements.findUnique({
			where: {
				stockMovementId: id,
			},
			include: {
				product: true,
				warehouse: true,
			},
		});
		return stockMovement as IStockMovement;
	}

	async createStockMovement(stockMovement: IStockMovement): Promise<IStockMovement> {
		const { product, warehouse, ...stockMovementData } = stockMovement;
		const createdStockMovement = await prisma.stockMovements.create({
			data: {
				...stockMovementData,
			},
		});
		return createdStockMovement as IStockMovement;
	}

	async updateStockMovement(stockMovement: IStockMovement): Promise<IStockMovement> {
		const { product, warehouse, ...stockMovementData } = stockMovement;
		const updatedStockMovement = await prisma.stockMovements.update({
			where: {
				stockMovementId: stockMovement.stockMovementId,
			},
			data: {
				...stockMovementData,
			},
		});
		return updatedStockMovement as IStockMovement;
	}

	async softDelete(stockMovementId: string): Promise<IStockMovement> {
		const deletedStockMovement = await prisma.stockMovements.update({
			where: {
				stockMovementId,
			},
			data: {
				deletedAt: new Date(),
			},
		});
		return deletedStockMovement as IStockMovement;
	}

	async forceDelete(stockMovementId: string): Promise<IStockMovement> {
		const forceDeletedStockMovement = await prisma.stockMovements.delete({
			where: {
				stockMovementId,
			},
		});
		return forceDeletedStockMovement as IStockMovement;
	}

	async restore(stockMovementId: string): Promise<IStockMovement> {
		const restoredStockMovement = await prisma.stockMovements.update({
			where: {
				stockMovementId,
			},
			data: {
				deletedAt: null,
			},
		});
		return restoredStockMovement as IStockMovement;
	}
}
