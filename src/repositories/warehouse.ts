import { PrismaClient } from '@prisma/client';
import { IWarehouse } from '../types/model';

const prisma = new PrismaClient();

export class WarehouseRepository {
  async getAllWarehouses(): Promise<IWarehouse[]> {
    const warehouses = await prisma.warehouses.findMany({
      include: {
        products: true,
        pic: true,
        sales: true,
        purchases: true,
      },
    });
    return warehouses as IWarehouse[];
  }

  async getWarehouseById(id: string): Promise<IWarehouse | null> {
    const warehouse = await prisma.warehouses.findUnique({
      where: {
        warehouseId: id,
      },
      include: {
        products: true,
        pic: true,
        sales: true,
        purchases: true,
      },
    });
    return warehouse as IWarehouse;
  }

  async createWarehouse(warehouse: IWarehouse): Promise<IWarehouse> {
    const { products, pic, sales, purchases, ...warehouseData } = warehouse;
    const createdWarehouse = await prisma.warehouses.create({
      data: {
        ...warehouseData,
      },
    });
    return createdWarehouse as IWarehouse;
  }

  async updateWarehouse(warehouse: IWarehouse): Promise<IWarehouse> {
    const { products, pic, sales, purchases, ...warehouseData } = warehouse;
    const updatedWarehouse = await prisma.warehouses.update({
      where: {
        warehouseId: warehouse.warehouseId,
      },
      data: {
        ...warehouseData,
      },
    });
    return updatedWarehouse as IWarehouse;
  }

  async softDelete(warehouseId: string): Promise<IWarehouse> {
    const deletedWarehouse = await prisma.warehouses.update({
      where: {
        warehouseId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedWarehouse as IWarehouse;
  }

  async forceDelete(warehouseId: string): Promise<IWarehouse> {
    const forceDeletedWarehouse = await prisma.warehouses.delete({
      where: {
        warehouseId,
      },
    });
    return forceDeletedWarehouse as IWarehouse;
  }

  async restore(warehouseId: string): Promise<IWarehouse> {
    const restoredWarehouse = await prisma.warehouses.update({
      where: {
        warehouseId,
      },
      data: {
        deletedAt: null,
      },
    });
    return restoredWarehouse as IWarehouse;
  }
}
