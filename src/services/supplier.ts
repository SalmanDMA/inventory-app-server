import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { SupplierRepository } from '../repositories/supplier';
import { ISupplier } from '../types/model';

const supplierRepository = new SupplierRepository();

export class SupplierService {
  async getSuppliers() {
    return await supplierRepository.getAllSuppliers();
  }

  async getSupplierById(id: string) {
    const supplier = await supplierRepository.getSupplierById(id);

    if (!supplier) {
      throw new NotFoundError('Supplier not found, please register first');
    }

    return supplier;
  }

  async updateSupplier(supplier: ISupplier) {
    const supplierData = await supplierRepository.getSupplierById(supplier.supplierId);

    if (!supplierData) {
      throw new NotFoundError('Supplier not found, please register first');
    }

    const updatedSupplier = await supplierRepository.updateSupplier(supplier);

    return updatedSupplier;
  }

  async createSupplier(supplier: ISupplier) {
    if (!supplier.companyName || !supplier.name || !supplier.email || !supplier.phone) {
      throw new InvariantError('Please provide all required fields');
    }

    const createdSupplier = await supplierRepository.createSupplier(supplier);
    return createdSupplier;
  }

  async softDeleteSuppliers(supplierIds: string[]) {
    for (const supplierId of supplierIds) {
      const supplierData = await supplierRepository.getSupplierById(supplierId);
      if (!supplierData) {
        throw new NotFoundError(`Supplier with ID ${supplierId} not found, please register first`);
      }
      await supplierRepository.softDelete(supplierData.supplierId);
    }
  }

  async restoreSuppliers(supplierIds: string[]) {
    for (const supplierId of supplierIds) {
      const supplierData = await supplierRepository.getSupplierById(supplierId);
      if (!supplierData) {
        throw new NotFoundError(`Supplier with ID ${supplierId} not found, please register first`);
      }
      await supplierRepository.restore(supplierData.supplierId);
    }
  }

  async forceDeleteSuppliers(supplierIds: string[]) {
    for (const supplierId of supplierIds) {
      const supplierData = await supplierRepository.getSupplierById(supplierId);
      if (!supplierData) {
        throw new NotFoundError(`Supplier with ID ${supplierId} not found, please register first`);
      }
      await supplierRepository.forceDelete(supplierData.supplierId);
    }
  }
}
