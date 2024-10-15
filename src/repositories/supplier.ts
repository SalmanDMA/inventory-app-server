import { PrismaClient } from '@prisma/client';
import { ISupplier } from '../types/model';

const prisma = new PrismaClient();

export class SupplierRepository {
  async getAllSuppliers(): Promise<ISupplier[]> {
    const suppliers = await prisma.suppliers.findMany({
      include: {
        products: true,
        purchases: true,
      },
    });
    return suppliers as ISupplier[];
  }

  async getSupplierById(id: string): Promise<ISupplier | null> {
    const supplier = await prisma.suppliers.findUnique({
      where: {
        supplierId: id,
      },
      include: {
        products: true,
        purchases: true,
      },
    });
    return supplier as ISupplier;
  }

  async createSupplier(supplier: ISupplier): Promise<ISupplier> {
    const { products, purchases, ...supplierData } = supplier;
    const createdSupplier = await prisma.suppliers.create({
      data: {
        ...supplierData,
      },
    });
    return createdSupplier as ISupplier;
  }

  async updateSupplier(supplier: ISupplier): Promise<ISupplier> {
    const { products, purchases, ...supplierData } = supplier;
    const updatedSupplier = await prisma.suppliers.update({
      where: {
        supplierId: supplier.supplierId,
      },
      data: {
        ...supplierData,
      },
    });
    return updatedSupplier as ISupplier;
  }

  async softDelete(supplierId: string): Promise<ISupplier> {
    const deletedSupplier = await prisma.suppliers.update({
      where: {
        supplierId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedSupplier as ISupplier;
  }

  async forceDelete(supplierId: string): Promise<ISupplier> {
    const forceDeletedSupplier = await prisma.suppliers.delete({
      where: {
        supplierId,
      },
    });
    return forceDeletedSupplier as ISupplier;
  }

  async restore(supplierId: string): Promise<ISupplier> {
    const restoredSupplier = await prisma.suppliers.update({
      where: {
        supplierId,
      },
      data: {
        deletedAt: null,
      },
    });
    return restoredSupplier as ISupplier;
  }
}
