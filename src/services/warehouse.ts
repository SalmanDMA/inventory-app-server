import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { WarehouseRepository } from '../repositories/warehouse';
import { IWarehouse } from '../types/model';

const warehouseRepository = new WarehouseRepository();

export class WarehouseService {
  private determineWarehouseStatus(capacity: number): 'AVAILABLE' | 'FULL' {
    return capacity > 0 ? 'AVAILABLE' : 'FULL';
  }

  async getWarehouses() {
    return await warehouseRepository.getAllWarehouses();
  }

  async getWarehouseById(id: string) {
    const warehouse = await warehouseRepository.getWarehouseById(id);

    if (!warehouse) {
      throw new NotFoundError('Warehouse not found, please register first');
    }

    return warehouse;
  }

  async updateWarehouse(warehouse: IWarehouse) {
    const warehouseData = await warehouseRepository.getWarehouseById(warehouse.warehouseId);

    if (!warehouseData) {
      throw new NotFoundError('Warehouse not found, please register first');
    }

    if (!warehouse.name || !warehouse.location) {
      throw new InvariantError('Please provide name and location');
    }

    if (warehouse.capacity < 0) {
      throw new InvariantError('Capacity must be a non-negative number');
    }

    warehouse.status = this.determineWarehouseStatus(warehouse.capacity);

    const updatedWarehouse = await warehouseRepository.updateWarehouse(warehouse);
    return updatedWarehouse;
  }

  async createWarehouse(warehouse: IWarehouse) {
    if (!warehouse.name || !warehouse.location) {
      throw new InvariantError('Please provide name and location');
    }

    if (warehouse.capacity < 0) {
      throw new InvariantError('Capacity must be a non-negative number');
    }

    warehouse.status = this.determineWarehouseStatus(warehouse.capacity);

    const createdWarehouse = await warehouseRepository.createWarehouse(warehouse);
    return createdWarehouse;
  }

  async softDeleteWarehouses(warehouseIds: string[]) {
    for (const warehouseId of warehouseIds) {
      const warehouseData = await warehouseRepository.getWarehouseById(warehouseId);
      if (!warehouseData) {
        throw new NotFoundError(`Warehouse with ID ${warehouseId} not found, please register first`);
      }
      await warehouseRepository.softDelete(warehouseData.warehouseId);
    }
  }

  async restoreWarehouses(warehouseIds: string[]) {
    for (const warehouseId of warehouseIds) {
      const warehouseData = await warehouseRepository.getWarehouseById(warehouseId);
      if (!warehouseData) {
        throw new NotFoundError(`Warehouse with ID ${warehouseId} not found, please register first`);
      }
      await warehouseRepository.restore(warehouseData.warehouseId);
    }
  }

  async forceDeleteWarehouses(warehouseIds: string[]) {
    for (const warehouseId of warehouseIds) {
      const warehouseData = await warehouseRepository.getWarehouseById(warehouseId);
      if (!warehouseData) {
        throw new NotFoundError(`Warehouse with ID ${warehouseId} not found, please register first`);
      }
      await warehouseRepository.forceDelete(warehouseData.warehouseId);
    }
  }
}
