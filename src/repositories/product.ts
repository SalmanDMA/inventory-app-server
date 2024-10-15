import { PrismaClient } from '@prisma/client';
import { IProduct } from '../types/model';

const prisma = new PrismaClient();

export class ProductRepository {
  async getAllProducts(): Promise<IProduct[]> {
    const products = await prisma.products.findMany({
      include: {
        brand: true,
        category: true,
        supplier: true,
        image: true,
      },
    });
    return products as IProduct[];
  }

  async getProductById(id: string): Promise<IProduct | null> {
    const product = await prisma.products.findUnique({
      where: {
        productId: id,
      },
      include: {
        brand: true,
        category: true,
        supplier: true,
        image: true,
      },
    });
    return product as IProduct;
  }

  async createProduct(product: IProduct): Promise<IProduct> {
    const { brand, category, supplier, image, purchaseDetails, salesDetails, stockMovements, ...productData } = product;
    const createdProduct = await prisma.products.create({
      data: {
        ...productData,
      },
    });
    return createdProduct as IProduct;
  }

  async updateProduct(product: IProduct): Promise<IProduct> {
    const { brand, category, supplier, image, purchaseDetails, salesDetails, stockMovements, ...productData } = product;
    const updatedProduct = await prisma.products.update({
      where: {
        productId: product.productId,
      },
      data: {
        ...productData,
      },
    });
    return updatedProduct as IProduct;
  }

  async softDelete(productId: string): Promise<IProduct> {
    const deletedProduct = await prisma.products.update({
      where: {
        productId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedProduct as IProduct;
  }

  async forceDelete(productId: string): Promise<IProduct> {
    const forceDeletedProduct = await prisma.products.delete({
      where: {
        productId,
      },
    });
    return forceDeletedProduct as IProduct;
  }

  async restore(productId: string): Promise<IProduct> {
    const restoredProduct = await prisma.products.update({
      where: {
        productId,
      },
      data: {
        deletedAt: null,
      },
    });
    return restoredProduct as IProduct;
  }
}
