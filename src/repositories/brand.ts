import { PrismaClient } from '@prisma/client';
import { IBrand } from '../types/model';

const prisma = new PrismaClient();

export class BrandRepository {
  async getAllBrands(): Promise<IBrand[]> {
    const brands = await prisma.brands.findMany({
      include: {
        image: true,
        products: true,
      },
    });
    return brands as IBrand[];
  }

  async getBrandById(id: string): Promise<IBrand | null> {
    const brand = await prisma.brands.findUnique({
      where: {
        brandId: id,
      },
      include: {
        image: true,
        products: true,
      },
    });
    return brand as IBrand;
  }

  async createBrand(brand: IBrand): Promise<IBrand> {
    const { image, products, ...brandData } = brand;
    const createdBrand = await prisma.brands.create({
      data: {
        ...brandData,
      },
    });
    return createdBrand as IBrand;
  }

  async updateBrand(brand: IBrand): Promise<IBrand> {
    const { image, products, ...brandData } = brand;
    const updatedBrand = await prisma.brands.update({
      where: {
        brandId: brand.brandId,
      },
      data: {
        ...brandData,
      },
    });
    return updatedBrand as IBrand;
  }

  async softDelete(brandId: string): Promise<IBrand> {
    const deletedBrand = await prisma.brands.update({
      where: {
        brandId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedBrand as IBrand;
  }

  async forceDelete(brandId: string): Promise<IBrand> {
    const forceDeletedBrand = await prisma.brands.delete({
      where: {
        brandId,
      },
    });
    return forceDeletedBrand as IBrand;
  }

  async restore(brandId: string): Promise<IBrand> {
    const restoredBrand = await prisma.brands.update({
      where: {
        brandId,
      },
      data: {
        deletedAt: null,
      },
    });
    return restoredBrand as IBrand;
  }
}
