import { PrismaClient } from '@prisma/client';
import { IProductHistory } from '../types/model';

const prisma = new PrismaClient();

export class ProductHistoryRepository {
  async getAllProductHistories(): Promise<IProductHistory[]> {
    const productHistories = await prisma.productHistories.findMany({
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            supplier: true,
          },
        },
        user: true,
      },
    });

    return productHistories as unknown as IProductHistory[];
  }

  async getAllUniqueProductHistories(): Promise<IProductHistory[]> {
    const productHistories = await prisma.productHistories.groupBy({
      by: ['productId'],
      _max: {
        createdAt: true,
      },
    });
  
    const latestProductIds = productHistories.map(history => history.productId);
    const latestHistories = await prisma.productHistories.findMany({
      where: {
        productId: {
          in: latestProductIds,
        },
        createdAt: {
          in: productHistories.map(history => history._max.createdAt as Date),
        },
      },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            supplier: true,
          },
        },
        user: true,
      },
    });
  
    return latestHistories as unknown as IProductHistory[];
  }

  async getLatestProductHistoryByProductId(productId: string): Promise<IProductHistory | null> {
    const latestProductHistory = await prisma.productHistories.findFirst({
      where: {
        productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            supplier: true,
          },
        },
        user: true,
      },
    });

    return latestProductHistory as unknown as IProductHistory;
  }

  async getAllProductHistoriesByProductId(productId: string): Promise<IProductHistory[]> {
    const productHistories = await prisma.productHistories.findMany({
      where: {
        productId,
      },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            supplier: true,
          },
        },
        user: true,
      },
    });

    return productHistories as unknown as IProductHistory[];
  }

  async getProductHistoryById(id: string): Promise<IProductHistory | null> {
    const productHistory = await prisma.productHistories.findUnique({
      where: {
        productHistoryId: id,
      },
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            supplier: true,
          },
        },
        user: true,
      },
    });

    return productHistory as unknown as IProductHistory;
  }

  async createProductHistory(productHistory: IProductHistory): Promise<IProductHistory> {
    const { product, user, ...productHistoryData } = productHistory;
    const createdProductHistory = await prisma.productHistories.create({
      data: {
        ...productHistoryData,
      },
    });
    return createdProductHistory as IProductHistory;
  }

  async updateProductHistory(productHistory: IProductHistory): Promise<IProductHistory> {
    const { product, user, ...productHistoryData } = productHistory;
    const updatedProductHistory = await prisma.productHistories.update({
      where: {
        productHistoryId: productHistory.productHistoryId,
      },
      data: {
        ...productHistoryData,
      },
    });
    return updatedProductHistory as IProductHistory;
  }

  async softDelete(productHistoryId: string): Promise<IProductHistory> {
    const deletedProductHistory = await prisma.productHistories.update({
      where: {
        productHistoryId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedProductHistory as IProductHistory;
  }

  async forceDelete(productHistoryId: string): Promise<IProductHistory> {
    const forceDeletedProductHistory = await prisma.productHistories.delete({
      where: {
        productHistoryId,
      },
    });
    return forceDeletedProductHistory as IProductHistory;
  }

  async restore(productHistoryId: string): Promise<IProductHistory> {
    const restoredProductHistory = await prisma.productHistories.update({
      where: {
        productHistoryId,
      },
      data: {
        deletedAt: null,
      },
    });
    return restoredProductHistory as IProductHistory;
  }
}
